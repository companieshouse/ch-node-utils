import { NextFunction, Request, RequestHandler, Response } from "express"
import { QUERY_PAR_LANG } from "../constants/constants"
import LocalesService from "../services/locales/locales.service"

// import { LanguageNames } from '@basilest-ch/ch-node-utils'
import  LanguageNames  from '../utils/languageNames'

export function LocalesMiddleware(): RequestHandler {
      return (req: Request, res: Response, next: NextFunction) => {
         console.log("----------X2 (ManageLocales) ------------")

    let lang: string | undefined = (<string>req.query[QUERY_PAR_LANG] || req.session?.getExtraData<string>(QUERY_PAR_LANG))
    console.log(`=====1=====Mng Loc ....(init lang=${lang})`)
    console.log(req.session)

    console.log("=====2=====Mng Loc")
   if (lang === undefined || ! LanguageNames.isSupportedLocale (LocalesService.getInstance().localesFolder, lang)) {
         lang = "en"
    }
    if (req.session) {
      req.session.setExtraData(QUERY_PAR_LANG, lang) // when there is a session store it there
    }
    req.lang = lang // store it also as metadata in the request
    const [pathWithoutQuery] = req.url.split('?')
    req.url = pathWithoutQuery // remove query params from url (so previous/old controllers keep working)

    const currentUrl = `${req.protocol}://${req.get('host')}${pathWithoutQuery}`
    res.locals.currentUrl = currentUrl

    // node_modules/govuk-frontend/govuk/template.njk has (currently) the following lang vars
    res.locals.htmlLang = lang
    res.locals.pageTitleLang = lang
    res.locals.mainLang = lang

    return next()
  }
}
