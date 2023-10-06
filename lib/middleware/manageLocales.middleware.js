"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalesMiddleware = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../constants/constants");
const locales_service_1 = tslib_1.__importDefault(require("../services/locales/locales.service"));
const languageNames_1 = tslib_1.__importDefault(require("../utils/languageNames"));
function LocalesMiddleware() {
    return (req, res, next) => {
        var _a;
        console.log("----------X2 (ManageLocales) ------------");
        let lang = (req.query[constants_1.QUERY_PAR_LANG] ||
            req.body.lang ||
            ((_a = req.session) === null || _a === void 0 ? void 0 : _a.getExtraData(constants_1.QUERY_PAR_LANG)));
        console.log(`=====1=====Mng Loc ....(init lang=${lang}) - body:${req.body.lang}`);
        console.log("body:");
        console.log(req.body);
        console.log("=====2=====Mng Loc");
        if (lang === undefined || !languageNames_1.default.isSupportedLocale(locales_service_1.default.getInstance().localesFolder, lang)) {
            lang = "en";
        }
        if (req.session) {
            req.session.setExtraData(constants_1.QUERY_PAR_LANG, lang);
        }
        req.lang = lang;
        const [pathWithoutQuery] = req.url.split("?");
        req.url = pathWithoutQuery;
        const currentUrl = `${req.protocol}://${req.get("host")}${pathWithoutQuery}`;
        res.locals.currentUrl = currentUrl;
        res.locals.htmlLang = lang;
        res.locals.pageTitleLang = lang;
        res.locals.mainLang = lang;
        return next();
    };
}
exports.LocalesMiddleware = LocalesMiddleware;
//# sourceMappingURL=manageLocales.middleware.js.map