"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getGOVUKFrontendVersion;
const node_fs_1 = require("node:fs");
function getGOVUKFrontendVersion() {
    const file = (0, node_fs_1.readFileSync)("package.json");
    const packageJson = JSON.parse(file.toString());
    const version = packageJson.dependencies["govuk-frontend"];
    if (!version) {
        throw new Error(`GOV.UK Frontend not found installed in package.json dependencies.`);
    }
    if (!version.match(/^\d/)) {
        throw new Error(`GOV.UK Frontend range specified version "${version}" found in package.json dependencies, must be an exact pinned version: e.g. "1.0.0".`);
    }
    return version;
}
//# sourceMappingURL=getGOVUKFrontendVersion.js.map