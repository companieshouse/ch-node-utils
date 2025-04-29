/**
 * @jest-environment jsdom
 */

import nunjucks from "nunjucks";

nunjucks.configure(["templates", "node_modules/govuk-frontend/dist"], {
	noCache: true,
});

const layoutDefaultParameters = {
	cdnHost: "https://example.cloudfront.net",
	govukFrontendVersion: "5.9.0",
};

describe("companies house top level template", () => {
    const receivedOutput = nunjucks.render(
        "layouts/template.njk",
        layoutDefaultParameters
    );
    document.documentElement.innerHTML = receivedOutput;
    describe("GOV.UK Frontend", () => {
        it("links to CDN icons", () => {
            const icon48by48 = document.head.querySelector(
                `link[rel="icon"][sizes="48x48"]`
            );
            expect(icon48by48?.getAttribute("href")).toBe(
                "https://example.cloudfront.net/images/govuk-frontend/v5.9.0/favicon.ico"
            );

            const iconAnySize = document.head.querySelector(
                `link[rel="icon"][sizes="any"]`
            );
            expect(iconAnySize?.getAttribute("href")).toBe(
                "https://example.cloudfront.net/images/govuk-frontend/v5.9.0/favicon.svg"
            );
            expect(iconAnySize?.getAttribute("type")).toBe("image/svg+xml");

            const maskIcon = document.head.querySelector(`link[rel="mask-icon"]`);
            expect(maskIcon?.getAttribute("href")).toBe(
                "https://example.cloudfront.net/images/govuk-frontend/v5.9.0/govuk-icon-mask.svg"
            );
            expect(maskIcon?.getAttribute("color")).toBe("#0b0c0c");

            const appleTouchIcon = document.head.querySelector(
                `link[rel="apple-touch-icon"]`
            );
            expect(appleTouchIcon?.getAttribute("href")).toBe(
                "https://example.cloudfront.net/images/govuk-frontend/v5.9.0/govuk-icon-180.png"
            );
        });

        it("links to CDN stylesheet", () => {
            const stylesheet = document.head.querySelector(`link[rel="stylesheet"]`);
            expect(stylesheet?.getAttribute("href")).toBe(
                "https://example.cloudfront.net/stylesheets/govuk-frontend/v5.9.0/govuk-frontend-5.9.0.min.css"
            );
        });

        it("imports CDN JavaScript and initialises components", () => {
            const endScript = document.body.lastElementChild;
            expect(endScript?.tagName).toBe("SCRIPT");
            expect(endScript?.innerHTML.trim()).toBe(`
    import { initAll } from 'https://example.cloudfront.net/javascripts/govuk-frontend/v5.9.0/govuk-frontend-5.9.0.min.js'
    initAll()
            `.trim());
        });
    });
});
