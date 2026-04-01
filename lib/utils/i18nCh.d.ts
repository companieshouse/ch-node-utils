export default class i18nCh {
    private static instance;
    private i18nInst;
    private localesFolder;
    private nodeModulesFolder;
    private nameSpaces;
    private constructor();
    static getInstance(localesFolder?: string, nameSpaces?: string[], lang?: string): i18nCh;
    private loadAllNamespaces;
    private loadNamespacesFromFolder;
    private getLanguageFolders;
    private getFoldersFromPath;
    private changeLanguage;
    private loadGenericKey;
    resolveNamespacesKeys(lang: string, vars?: any, unescape?: boolean): Record<string, any>;
    resolveSingleKey(key: string, lang: string, vars?: any, unescape?: boolean): string;
    loadNamespaces(nameSpaces?: string[]): void;
    getResourceBundle(lng: string, ns: string): any;
}
