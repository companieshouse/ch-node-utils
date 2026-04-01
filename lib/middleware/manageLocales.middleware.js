"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalesMiddleware = LocalesMiddleware;
const tslib_1 = require("tslib");
const constants_1 = require("../constants/constants");
const locales_service_1 = tslib_1.__importDefault(require("../services/locales/locales.service"));
const languageNames_1 = tslib_1.__importDefault(require("../utils/languageNames"));
const log_1 = tslib_1.__importDefault(require("../utils/log"));
const sessionUtils_1 = require("../utils/sessionUtils");
function LocalesMiddleware() {
    return (req, res, next) => {
        (0, log_1.default)("---------- LocalesMiddleware ------------");
        let lang = req.query[constants_1.QUERY_PAR_LANG] ||
            req.body?.lang ||
            req.session?.getLanguage();
        (0, log_1.default)(`LocalesMiddleware ....(init with received values: lang=${lang}) - body:${req.body?.lang ?? 'N/A'})`);
        if (lang === undefined || !languageNames_1.default.isSupportedLocale(locales_service_1.default.getInstance().localesFolder, lang)) {
            lang = "en";
        }
        (0, log_1.default)(`LocalesMiddleware ....(setting lang=${lang})`);
        if (req.session) {
            req.session.setLanguage(lang);
        }
        req.lang = lang;
        let currentUrl = req.url;
        if (process.env.CH_NODE_UTILS_DROP_LANG_QUERY_PARAM) {
            const cUrl = new URL(`http://a${req.url}`);
            cUrl.searchParams.delete(constants_1.QUERY_PAR_LANG);
            currentUrl = `${cUrl.pathname}${cUrl.search}`;
            (0, log_1.default)(`LocalesMiddleware: removing '${constants_1.QUERY_PAR_LANG}'= query param (req.url=${currentUrl})`);
        }
        req.url = currentUrl;
        res.locals.currentUrl = `${req.protocol}://${req.get("host")}${currentUrl}`;
        res.locals.htmlLang = lang;
        res.locals.pageTitleLang = lang;
        res.locals.mainLang = lang;
        if ((0, sessionUtils_1.isAuthorisedAgent)(req.session)) {
            res.locals.displayAuthorisedAgent = "yes";
        }
        return next();
    };
}
//# sourceMappingURL=manageLocales.middleware.js.map