import { NextFunction, Request, RequestHandler, Response } from "express"
import { QUERY_PAR_LANG } from "../constants/constants"
import  LocalesService from "../services/locales/locales.service"
import  LanguageNames  from "../utils/languageNames"
import log from "../utils/log";

export function LocalesMiddleware(): RequestHandler {
   return (req: Request, res: Response, next: NextFunction) => {

      log("---------- LocalesMiddleware ------------")
      let lang: string | undefined = (<string>req.query[QUERY_PAR_LANG] ||
                                       req.body.lang ||
                                       req.session?.getExtraData<string>(QUERY_PAR_LANG))
      log(`LocalesMiddleware ....(init with received values: lang=${lang}) - body:${req.body.lang})`)
      if (lang === undefined || ! LanguageNames.isSupportedLocale (LocalesService.getInstance().localesFolder, lang)) {
            lang = "en"
      }
      log(`LocalesMiddleware ....(setting lang=${lang})`)
      if (req.session) {
         req.session.setExtraData(QUERY_PAR_LANG, lang) // when there is a session store it there
      }
      req.lang = lang // store it also as metadata in the request
      const [pathWithoutQuery] = req.url.split("?")
      req.url = pathWithoutQuery // remove query params from url (so previous/old controllers keep working)

      const currentUrl = `${req.protocol}://${req.get("host")}${pathWithoutQuery}`
      res.locals.currentUrl = currentUrl

      // node_modules/govuk-frontend/govuk/template.njk has (currently) the following lang vars
      res.locals.htmlLang = lang
      res.locals.pageTitleLang = lang
      res.locals.mainLang = lang

      return next()
   }
}
