/**
 * @jest-environment jsdom
 */

import nunjucks from "nunjucks";

const nunjucksWithGOVUKFrontend5 = new nunjucks.Environment(
	new nunjucks.FileSystemLoader([
		"templates",
		"node_modules/govuk-frontend-5-10-2/dist",
	]),
	{
		noCache: true,
	}
);
const nunjucksWithGOVUKFrontend4 = new nunjucks.Environment(
	new nunjucks.FileSystemLoader([
		"templates",
		"node_modules/govuk-frontend-4-10-0",
	]),
	{
		noCache: true,
	}
);

const layoutDefaultParameters = {
	cdnHost: "https://example.cloudfront.net",
    govukRebrand: false
};

function renderTemplate (
    govukFrontendVersion: string,
    customlayoutParameters = {}
) {
    let nunjucksEnvironment = null;
    if (govukFrontendVersion.startsWith("5")) {
        nunjucksEnvironment = nunjucksWithGOVUKFrontend5
    } else if (govukFrontendVersion.startsWith("4")) {
        nunjucksEnvironment = nunjucksWithGOVUKFrontend4
    }
    if (nunjucksEnvironment === null) {
        throw new Error(`No environment configured for testing version %{govukFrontendVersion}`);
    }
    const layoutParameters = {
        ...layoutDefaultParameters,
        govukFrontendVersion,
        ...customlayoutParameters
    }
    const receivedOutput = nunjucksEnvironment.render(
        "layouts/template.njk",
        layoutParameters
    );
    document.documentElement.innerHTML = receivedOutput;
}

function cleanupRenderedTemplate () {
    document.getElementsByTagName('html')[0].innerHTML = '';
}

describe("companies house top level template", () => {
    afterEach(() => {
        cleanupRenderedTemplate();
    });
    describe.each(
        ["5.10.2", "4.10.0"]
    )("GOV.UK Frontend version %s", (govukFrontendVersion) => {
        it("links to CDN icons", () => {
            renderTemplate(govukFrontendVersion);
            const icon48by48 = document.head.querySelector(
                `link[rel="icon"][sizes="48x48"]`
            );
            expect(icon48by48?.getAttribute("href")).toBe(
                `https://example.cloudfront.net/images/govuk-frontend/v${govukFrontendVersion}/favicon.ico`
            );

            const iconAnySize = document.head.querySelector(
                `link[rel="icon"][sizes="any"]`
            );
            expect(iconAnySize?.getAttribute("href")).toBe(
                `https://example.cloudfront.net/images/govuk-frontend/v${govukFrontendVersion}/favicon.svg`
            );
            expect(iconAnySize?.getAttribute("type")).toBe("image/svg+xml");

            const maskIcon = document.head.querySelector(`link[rel="mask-icon"]`);
            expect(maskIcon?.getAttribute("href")).toBe(
                `https://example.cloudfront.net/images/govuk-frontend/v${govukFrontendVersion}/govuk-icon-mask.svg`
            );
            expect(maskIcon?.getAttribute("color")).toBe("#0b0c0c");

            const appleTouchIcon = document.head.querySelector(
                `link[rel="apple-touch-icon"]`
            );
            expect(appleTouchIcon?.getAttribute("href")).toBe(
                `https://example.cloudfront.net/images/govuk-frontend/v${govukFrontendVersion}/govuk-icon-180.png`
            );
        });

        it("links to Open Graph image", () => {
            renderTemplate(govukFrontendVersion);
            const opengraphImage = document.head.querySelector(
                `meta[property="og:image"]`
            );
            expect(opengraphImage?.getAttribute("content")).toBe(
                `https://example.cloudfront.net/images/govuk-frontend/v${govukFrontendVersion}/govuk-opengraph-image.png`
            );
        });

        it("links to CDN stylesheet", () => {
            renderTemplate(govukFrontendVersion);
            const stylesheet = document.head.querySelector(`link[rel="stylesheet"]`);
            expect(stylesheet?.getAttribute("href")).toBe(
                `https://example.cloudfront.net/stylesheets/govuk-frontend/v${govukFrontendVersion}/govuk-frontend-${govukFrontendVersion}.min.css`
            );
        });

        it("links to CDN manifest.json", () => {
            renderTemplate(govukFrontendVersion);
            const manifest = document.head.querySelector(
                `link[rel="manifest"]`
            );
            expect(manifest?.getAttribute("href")).toBe(
                `https://example.cloudfront.net/static/govuk-frontend/v${govukFrontendVersion}/manifest.json`
            );
        });

        describe("supports govukRebrand mode", () => {
            it("links to CDN icons", () => {
                renderTemplate(govukFrontendVersion, {
                    govukRebrand: true
                });
                const icon48by48 = document.head.querySelector(
                    `link[rel="icon"][sizes="48x48"]`
                );
                expect(icon48by48?.getAttribute("href")).toBe(
                    `https://example.cloudfront.net/images/govuk-frontend/v${govukFrontendVersion}/rebrand/favicon.ico`
                );

                const iconAnySize = document.head.querySelector(
                    `link[rel="icon"][sizes="any"]`
                );
                expect(iconAnySize?.getAttribute("href")).toBe(
                    `https://example.cloudfront.net/images/govuk-frontend/v${govukFrontendVersion}/rebrand/favicon.svg`
                );
                expect(iconAnySize?.getAttribute("type")).toBe("image/svg+xml");

                const maskIcon = document.head.querySelector(`link[rel="mask-icon"]`);
                expect(maskIcon?.getAttribute("href")).toBe(
                    `https://example.cloudfront.net/images/govuk-frontend/v${govukFrontendVersion}/rebrand/govuk-icon-mask.svg`
                );
                expect(maskIcon?.getAttribute("color")).toBe("#1d70b8");

                const appleTouchIcon = document.head.querySelector(
                    `link[rel="apple-touch-icon"]`
                );
                expect(appleTouchIcon?.getAttribute("href")).toBe(
                    `https://example.cloudfront.net/images/govuk-frontend/v${govukFrontendVersion}/rebrand/govuk-icon-180.png`
                );
            });

            it("links to rebrand CDN manifest.json", () => {
                renderTemplate(govukFrontendVersion, {
                    govukRebrand: true
                });
                const manifest = document.head.querySelector(
                    `link[rel="manifest"]`
                );
                expect(manifest?.getAttribute("href")).toBe(
                    `https://example.cloudfront.net/static/govuk-frontend/v${govukFrontendVersion}/rebrand/manifest.json`
                );
            });
        })
    });
    describe("GOV.UK Frontend version 5.10.2", () => {
        it("imports CDN JavaScript and initialises components", () => {
            renderTemplate("5.10.2");
            const endScript = document.body.lastElementChild;
            expect(endScript?.tagName).toBe("SCRIPT");
            expect(endScript?.innerHTML.trim()).toBe(`
        import { initAll } from 'https://example.cloudfront.net/javascripts/govuk-frontend/v5.10.2/govuk-frontend-5.10.2.min.js'
      initAll()
            `.trim());
        });
    });
    describe("GOV.UK Frontend version 4.10.0", () => {
        it("JavaScript and initialises components", () => {
            renderTemplate("4.10.0");

            const endScript = document.body.lastElementChild;
            const secondToLastScript = endScript?.previousElementSibling;
        
            expect(secondToLastScript?.tagName).toBe("SCRIPT");
            expect(secondToLastScript?.getAttribute("src")).toBe("https://example.cloudfront.net/javascripts/govuk-frontend/v4.10.0/govuk-frontend-4.10.0.min.js");
        
            expect(endScript?.tagName).toBe("SCRIPT");
            expect(endScript?.innerHTML.trim()).toBe("window.GOVUKFrontend.initAll()");
        });
    });
});
