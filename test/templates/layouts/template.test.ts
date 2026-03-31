/**
 * @jest-environment jsdom
 */

import nunjucks from "nunjucks";

const nunjucksWithGOVUKFrontend6 = new nunjucks.Environment(
    new nunjucks.FileSystemLoader([
        "templates",
        "node_modules/govuk-frontend-6-0-0/dist",
    ]),
    {
        noCache: true,
    }
);

const layoutDefaultParameters = {
    cdnHost: "https://example.cloudfront.net"
};

function renderTemplate (
    govukFrontendVersion: string,
    customLayoutParameters = {}
) {
    // let nunjucksEnvironment = null;
    const nunjucksEnvironment = nunjucksWithGOVUKFrontend6;
    if (nunjucksEnvironment === null) {
        throw new Error(`No environment configured for testing version %{govukFrontendVersion}`);
    }
    const layoutParameters = {
        ...layoutDefaultParameters,
        govukFrontendVersion,
        ...customLayoutParameters
    };
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
        ["6.0.0"]
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
            expect(maskIcon?.getAttribute("color")).toBe("#1d70b8");

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

        it("supports adding nonce values to inline scripts", () => {
            // Example nonce from: https://content-security-policy.com/examples/allow-inline-script/
            renderTemplate(govukFrontendVersion, {
                cspNonce: "rAnd0m"
            });
            const endScript = document.body.lastElementChild;
            expect(endScript?.tagName).toBe("SCRIPT");
            expect(endScript?.innerHTML).not.toBe("");
            expect(endScript?.getAttribute("nonce")).toBe("rAnd0m");
        });

        it("imports CDN JavaScript and initialises components", () => {
            renderTemplate(govukFrontendVersion);
            const endScript = document.body.lastElementChild;
            expect(endScript?.tagName).toBe("SCRIPT");
            expect(endScript?.innerHTML.trim()).toBe(`
        import { initAll } from 'https://example.cloudfront.net/javascripts/govuk-frontend/v${govukFrontendVersion}/govuk-frontend-${govukFrontendVersion}.min.js'
    initAll()
            `.trim());
        });
    });
});
