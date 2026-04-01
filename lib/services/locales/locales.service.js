"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18nCh_1 = tslib_1.__importDefault(require("../../utils/i18nCh"));
const log_1 = tslib_1.__importDefault(require("../../utils/log"));
class LocalesService {
    static instance;
    enabled;
    localesFolder;
    i18nCh;
    constructor(localesFolder, enabled) {
        (0, log_1.default)("---------- LocalesService: constructor ------------");
        this.enabled = enabled;
        this.localesFolder = localesFolder;
        this.i18nCh = i18nCh_1.default.getInstance(localesFolder);
        (0, log_1.default)(`enabled: ${this.enabled} / path: ${this.localesFolder}`);
    }
    static getInstance(localesFolder = "locales", enabled = false) {
        (0, log_1.default)("---------- LocalesService: getInstance ------------");
        if (!LocalesService.instance) {
            LocalesService.instance = new LocalesService(localesFolder, enabled);
        }
        return LocalesService.instance;
    }
}
exports.default = LocalesService;
//# sourceMappingURL=locales.service.js.map