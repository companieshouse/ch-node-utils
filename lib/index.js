"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY_PAR_LANG = exports.LocalesService = exports.LocalesMiddleware = exports.i18nCh = exports.LanguageNames = exports.NamedIsoCode = exports.SubDirs = void 0;
const tslib_1 = require("tslib");
const subDirs_1 = tslib_1.__importDefault(require("./utils/subDirs"));
exports.SubDirs = subDirs_1.default;
const languageNames_1 = tslib_1.__importStar(require("./utils/languageNames"));
exports.LanguageNames = languageNames_1.default;
Object.defineProperty(exports, "NamedIsoCode", { enumerable: true, get: function () { return languageNames_1.NamedIsoCode; } });
const i18nCh_1 = tslib_1.__importDefault(require("./utils/i18nCh"));
exports.i18nCh = i18nCh_1.default;
const locales_service_1 = tslib_1.__importDefault(require("./services/locales/locales.service"));
exports.LocalesService = locales_service_1.default;
const manageLocales_middleware_1 = require("./middleware/manageLocales.middleware");
Object.defineProperty(exports, "LocalesMiddleware", { enumerable: true, get: function () { return manageLocales_middleware_1.LocalesMiddleware; } });
const constants_1 = require("./constants/constants");
Object.defineProperty(exports, "QUERY_PAR_LANG", { enumerable: true, get: function () { return constants_1.QUERY_PAR_LANG; } });
//# sourceMappingURL=index.js.map