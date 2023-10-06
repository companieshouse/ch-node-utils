export declare class NamedIsoCode {
    IsoCode: string;
    Name: string;
    constructor(IsoCode: string, Name: string);
}
export default class LanguageNames {
    static getNamesArray(isoCodes: string[]): string[];
    static getNativeNamesArray(isoCodes: string[]): string[];
    static getNamesObjectArray(isoCodes: string[]): NamedIsoCode[];
    static getNativeNamesObjectArray(isoCodes: string[]): NamedIsoCode[];
    private static _customSort;
    static sourceLocales(localesDir: string): NamedIsoCode[];
    static isSupportedLocale(localesDir: string, locale: string): boolean;
}
