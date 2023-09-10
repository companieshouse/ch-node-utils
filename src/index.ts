import SubDirs from "./utils/subDirs";
import LanguageNames, {NamedIsoCode} from "./utils/languageNames";
import i18nCh from "./utils/i18nCh";
import LocalesService from "./services/locales/locales.service"
import { LocalesMiddleware } from "./middleware/manageLocales.middleware"
import { QUERY_PAR_LANG } from "./constants/constants"

export { 
   SubDirs, 
   NamedIsoCode, 
   LanguageNames, 
   i18nCh, 
   LocalesMiddleware, 
   LocalesService,
   QUERY_PAR_LANG };