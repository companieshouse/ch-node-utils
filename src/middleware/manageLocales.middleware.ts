import { NextFunction, Request, RequestHandler, Response } from "express"
import { QUERY_PAR_LANG } from "../constants/constants"
import LocalesService from "../services/locales/locales.service"
import LanguageNames from "../utils/languageNames"
import log from "../utils/log";
import { isAuthorisedAgent } from "../utils/sessionUtils";

export function LocalesMiddleware (): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {

        log("---------- LocalesMiddleware ------------")
        let lang: string | undefined = (<string>req.query[QUERY_PAR_LANG] ||
            req.body.lang ||
            req.session?.getExtraData<string>(QUERY_PAR_LANG))
        log(`LocalesMiddleware ....(init with received values: lang=${lang}) - body:${req.body.lang})`)
        if (lang === undefined || !LanguageNames.isSupportedLocale(LocalesService.getInstance().localesFolder, lang)) {
            lang = "en"
        }
        log(`LocalesMiddleware ....(setting lang=${lang})`)
        if (req.session) {
            req.session.setExtraData(QUERY_PAR_LANG, lang) // when there is a session store it there
        }
        req.lang = lang // store it also as metadata in the request

        let currentUrl = req.url
        if (process.env.CH_NODE_UTILS_DROP_LANG_QUERY_PARAM) { // FALSE if (unset / xxxx= / xxxx='') | TRUE if set (any value)
            // controllers in some services (eg. dissolution-web) failed when introducing the
            // "lang=xx" query-param in the URL.
            // We then allow, (via an env var), to opt to remove that param.
            let cUrl = new URL(`http://a${req.url}`)  // "http://a" just to have a full URL (we don't need the 1st part)
            cUrl.searchParams.delete(QUERY_PAR_LANG)
            currentUrl = `${cUrl.pathname}${cUrl.search}`
            log(`LocalesMiddleware: removing '${QUERY_PAR_LANG}'= query param (req.url=${currentUrl})`)
        }

        req.url = currentUrl
        res.locals.currentUrl = `${req.protocol}://${req.get("host")}${currentUrl}`

        // node_modules/govuk-frontend/govuk/template.njk has (currently) the following lang vars
        res.locals.htmlLang = lang
        res.locals.pageTitleLang = lang
        res.locals.mainLang = lang
        if (isAuthorisedAgent(req.session)) {
            res.locals.displayAuthorisedAgent = "yes";
        }

        return next()
    }
}
