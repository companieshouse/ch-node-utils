import iso6391 from "iso-639-1";
import SubDirs from "./subDirs.js";

export class NamedIsoCode {
   constructor(public IsoCode: string, public Name: string) {
   }
}

export default class LanguageNames {
   static getNamesArray(isoCodes: string[]) {
      return isoCodes.map((isoCode) => iso6391.getName(isoCode));  // cy => "Welsh"
   }

   static getNativeNamesArray(isoCodes: string[]) {
      return isoCodes.map((isoCode) => iso6391.getNativeName(isoCode));  // cy => "Cymraeg"
   }

   static getNamesObjectArray(isoCodes: string[]) {
      // [... "cy", ...]   ==> [ ... {"IsoCode": "cy", "Name": "Welsh" } ...]
      return isoCodes.map((isoCode) => (new NamedIsoCode(isoCode, iso6391.getName(isoCode))) );
   }

   static getNativeNamesObjectArray(isoCodes: string[]) {
      // [... "cy", ...]   ==> [ ... {"IsoCode": "cy", "Name": "Cymraeg" } ...]
      return isoCodes.map((isoCode) => (new NamedIsoCode(isoCode, iso6391.getNativeName(isoCode))) );
   }



   // custom sort to leave "en" always at 1st position
   private static _customSort(a: string, b: string): number {
   if (a === "en") { return -1; } // "en" is considered smaller, so it will be placed at the beginning
   if (b === "en") { return  1; }

   return a.localeCompare(b); // Sort other elements in ascending order
   }

   static sourceLocales( localesDir: string ): NamedIsoCode[] {
      const  localesArray = SubDirs.getSubDirs (localesDir);
      return LanguageNames.getNativeNamesObjectArray (localesArray.sort(LanguageNames._customSort));
   }

   static isSupportedLocale( localesDir: string, locale: string ): boolean {
      return SubDirs.getSubDirs (localesDir).includes (locale);
   }
}
