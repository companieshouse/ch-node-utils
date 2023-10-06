export default class i18nCh {
    private static instance;
    private i18nInst;
    private localesFolder;
    private nameSpaces;
    private constructor();
    static getInstance(localesFolder?: string, nameSpaces?: string[], lang?: string): i18nCh;
    private loadAllNamespaces;
    private changeLanguage;
    resolveNamespacesKeys(lang: string, vars?: any): any;
    resolveSingleKey(key: string, lang: string, vars?: any): string;
    loadNamespaces(nameSpaces?: string[]): void;
}
