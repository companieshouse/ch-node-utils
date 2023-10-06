"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18nCh_1 = tslib_1.__importDefault(require("../../utils/i18nCh"));
class LocalesService {
    constructor(localesFolder, enabled) {
        console.log("----------X0 (construct) ------------");
        this.enabled = enabled;
        this.localesFolder = localesFolder;
        this.i18nCh = i18nCh_1.default.getInstance(localesFolder);
        console.log(`enabled: ${this.enabled} / path: ${this.localesFolder}`);
        console.log(`enabled: ${this.enabled} / path: ${this.localesFolder} / i18nCh: ${this.i18nCh}`);
    }
    static getInstance(localesFolder = "locales", enabled = false) {
        console.log("----------X0 (getInst) ------------");
        if (!LocalesService.instance) {
            LocalesService.instance = new LocalesService(localesFolder, enabled);
        }
        return LocalesService.instance;
    }
}
exports.default = LocalesService;
//# sourceMappingURL=locales.service.js.map