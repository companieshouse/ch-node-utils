"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamedIsoCode = void 0;
const tslib_1 = require("tslib");
const iso_639_1_1 = tslib_1.__importDefault(require("iso-639-1"));
const subDirs_js_1 = tslib_1.__importDefault(require("./subDirs.js"));
class NamedIsoCode {
    constructor(IsoCode, Name) {
        this.IsoCode = IsoCode;
        this.Name = Name;
    }
}
exports.NamedIsoCode = NamedIsoCode;
class LanguageNames {
    static getNamesArray(isoCodes) {
        return isoCodes.map((isoCode) => iso_639_1_1.default.getName(isoCode));
    }
    static getNativeNamesArray(isoCodes) {
        return isoCodes.map((isoCode) => iso_639_1_1.default.getNativeName(isoCode));
    }
    static getNamesObjectArray(isoCodes) {
        return isoCodes.map((isoCode) => (new NamedIsoCode(isoCode, iso_639_1_1.default.getName(isoCode))));
    }
    static getNativeNamesObjectArray(isoCodes) {
        return isoCodes.map((isoCode) => (new NamedIsoCode(isoCode, iso_639_1_1.default.getNativeName(isoCode))));
    }
    static _customSort(a, b) {
        if (a === "en") {
            return -1;
        }
        if (b === "en") {
            return 1;
        }
        return a.localeCompare(b);
    }
    static sourceLocales(localesDir) {
        const localesArray = subDirs_js_1.default.getSubDirs(localesDir);
        return LanguageNames.getNativeNamesObjectArray(localesArray.sort(LanguageNames._customSort));
    }
    static isSupportedLocale(localesDir, locale) {
        return subDirs_js_1.default.getSubDirs(localesDir).includes(locale);
    }
}
exports.default = LanguageNames;
//# sourceMappingURL=languageNames.js.map