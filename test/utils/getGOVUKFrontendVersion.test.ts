import getGOVUKFrontendVersion from "../../src/utils/getGOVUKFrontendVersion";
import { readFileSync } from "node:fs";

jest.mock("node:fs");

describe("getGOVUKFrontendVersion", () => {
    it("will fail if package.json does not contain GOV.UK Frontend package", () => {
        readFileSync.mockImplementationOnce(() => JSON.stringify({
            "dependencies": {}
        }));
        expect(() => {
            getGOVUKFrontendVersion()
        }).toThrow("GOV.UK Frontend not found installed in package.json dependencies.");
    });
    it("will fail if package.json contains GOV.UK Frontend package which is not pinned", () => {
        readFileSync.mockImplementationOnce(() => JSON.stringify({
            "dependencies": {
                "govuk-frontend": "^5.9.0"
            }
        }));
        expect(() => {
            getGOVUKFrontendVersion()
        }).toThrow("GOV.UK Frontend range specified version \"^5.9.0\" found in package.json dependencies, must be an exact pinned version: e.g. \"1.0.0\".");
    });
    it("will succeed if package.json contains GOV.UK Frontend package which is pinned", () => {
        readFileSync.mockImplementationOnce(() => JSON.stringify({
            "dependencies": {
                "govuk-frontend": "5.9.0"
            }
        }));
        expect(getGOVUKFrontendVersion()).toBe("5.9.0")
    });
});
