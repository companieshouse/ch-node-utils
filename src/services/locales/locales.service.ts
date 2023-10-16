import i18nCh  from "../../utils/i18nCh"
import log from "../../utils/log";


export default class LocalesService {
   private static instance: LocalesService

   public enabled: Boolean
   public localesFolder: string
   public i18nCh: i18nCh

   //_______________________________________________________________________________________________
   private constructor(localesFolder: string, enabled: Boolean) {
      log("---------- LocalesService: constructor ------------")
      this.enabled = enabled
      this.localesFolder = localesFolder
      this.i18nCh = i18nCh.getInstance(localesFolder)
      console.log(`enabled: ${this.enabled} / path: ${this.localesFolder}`)
      console.log(`enabled: ${this.enabled} / path: ${this.localesFolder} / i18nCh: ${this.i18nCh}`)
   }

   //_______________________________________________________________________________________________
   // Singleton retriever
   public static getInstance(localesFolder: string = "locales", enabled: Boolean = false): LocalesService {
      log("---------- LocalesService: getInstance ------------")
      if (!LocalesService.instance) {
         LocalesService.instance = new LocalesService(localesFolder, enabled)
      }
      return LocalesService.instance;
   }
}
