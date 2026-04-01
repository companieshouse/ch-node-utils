"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
class SubDirs {
    static getSubDirs(dirPath) {
        const contents = fs_1.default.readdirSync(dirPath);
        const subDirectories = contents.filter((item) => {
            const itemPath = path_1.default.join(dirPath, item);
            return fs_1.default.statSync(itemPath).isDirectory();
        });
        return subDirectories;
    }
}
exports.default = SubDirs;
//# sourceMappingURL=subDirs.js.map