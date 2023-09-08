import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import path    from 'path';
import fs, { readdirSync, lstatSync } from 'fs'

export default class i18nCh {

   private static instance: i18nCh
   private i18nInst
   private localesFolder
   private nameSpaces: string[] = [];

   //_______________________________________________________________________________________________
   private constructor(localesFolder = "", nameSpaces: string[] = [], lang = "en") {
      try {
         if (!localesFolder) {
            // no point to translate these errors as if they should ever happen they are input for devs, not customers
            throw new Error("i18nCh initialization error: path to locales must be provided")
         }
         this.localesFolder = localesFolder
         if ( nameSpaces.length === 0) {
            nameSpaces =  this.loadAllNamespaces();
         }
         this.nameSpaces = nameSpaces

         this.i18nInst = i18next
         this.i18nInst
            .use(Backend)
            .init({
            initImmediate: false, // false = will load the resources synchronously
            ns: nameSpaces,
            partialBundledLanguages: true,
            lng: lang,
            fallbackLng: 'en',
            preload: readdirSync(localesFolder).filter((fileName) => {
               const joinedPath = path.join(localesFolder, fileName)
               return lstatSync(joinedPath).isDirectory()
            }),
            backend: {
               loadPath: path.join(localesFolder, `{{lng}}/{{ns}}.json`)
            }
            })
      }
      catch (err) {
         throw err; // propagate
      }
   }
   //_______________________________________________________________________________________________
   // Singleton retriever
   public static getInstance(localesFolder?: string, nameSpaces?: string[], lang?: string): i18nCh {
      if (!i18nCh.instance) {
         i18nCh.instance = new i18nCh(localesFolder, nameSpaces, lang );
      }
      return i18nCh.instance;
   }

   //_______________________________________________________________________________________________
   // load all the file names (excluded .json) present in a certain dir
   private loadAllNamespaces (): string[] {
      const jsonFiles: string[] = [];

      if (this.localesFolder) {
         fs.readdirSync(path.join(this.localesFolder, 'en')).forEach((file) => {   // use 'en' as the only guaranteed to exist
            if (path.extname(file) === '.json') {
                     jsonFiles.push (path.basename(file, '.json'));
                  }
            });
      }
      return jsonFiles;
   }
   //_______________________________________________________________________________________________
   // load all the file names (excluded .json) present in a certain dir
   private changeLanguage (lang: string) {
      this.i18nInst.changeLanguage(lang, (err) => {
          if (err) throw new Error(`i18nCh changeLanguage error: ${err}`)
      });
   }

   //_______________________________________________________________________________________________
   // load all the file names (excluded extension: .json) present in a certain dir
   public resolveNamespacesKeys (lang: string, vars: any = {}) {
      let data: any = {};

      try {
          if (this.i18nInst && this.nameSpaces ) {
             this.changeLanguage (lang)
             const keysValuesList = this.i18nInst.getDataByLanguage('en'); // use 'en' as the only guaranteed to exist
             if ( keysValuesList !== undefined) {
                for (const [ns, value] of Object.entries(keysValuesList)) {
                   console.log(`${ns}: ${this.nameSpaces}`);
                   if (this.nameSpaces.includes(ns)) {
                      console.log(`${ns}`);
                      for (const [key] of Object.entries(value)) {
                         console.log(`${key}`);
                         data[key] = this.i18nInst.t(key, {lng: lang, ns: ns, vars});
                      }
                   }
                }
             }
          }
      }
      catch (err) {
         throw err; // propagate
      }

      return data;
   }
   //_______________________________________________________________________________________________
   // resolve 1 single key
   public resolveSingleKey (key: string, lang: string, vars: any = {}): string {
      let t = key
          if (this.i18nInst) {
              try {
                      this.changeLanguage (lang)
                      t = this.i18nInst.t(key, {lng: lang, ns: this.nameSpaces, vars})
                      console.log(`searched for key:${key} lang:${lang} and got: ${t}`)
              }
              catch (err) {
                 throw err; // propagate
              }
      }
      return t
   }
   //_______________________________________________________________________________________________
   // load further Namespaces
   public loadNamespaces (nameSpaces: string[] = [])  {
      if ( nameSpaces.length > 0 && this.i18nInst) {
         this.i18nInst.loadNamespaces(nameSpaces, (err) => {
            // no point to translate these errors as if they should ever happen they are input for devs, not customers
            throw new Error(`i18nCh loadNamespaces error - unable to load namespaces: ${nameSpaces} - ${err}`)
         })
      }
   }
}
