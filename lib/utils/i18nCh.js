"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const i18next_fs_backend_1 = tslib_1.__importDefault(require("i18next-fs-backend"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importStar(require("fs"));
const log_1 = tslib_1.__importDefault(require("./log"));
const constants_1 = require("../constants/constants");
class i18nCh {
    static instance;
    i18nInst;
    localesFolder;
    nodeModulesFolder;
    nameSpaces = [];
    constructor(localesFolder = "", nameSpaces = [], lang = "en") {
        if (!localesFolder) {
            throw new Error("i18nCh initialization error: path to locales must be provided");
        }
        this.localesFolder = localesFolder;
        this.nodeModulesFolder = constants_1.NODE_MODULES_LOCALES_PATH;
        if (nameSpaces.length === 0) {
            nameSpaces = this.loadAllNamespaces();
        }
        this.nameSpaces = nameSpaces;
        this.i18nInst = i18next_1.default;
        this.i18nInst
            .use(i18next_fs_backend_1.default)
            .init({
            initImmediate: false,
            ns: nameSpaces,
            partialBundledLanguages: true,
            lng: lang,
            fallbackLng: "en",
            preload: this.getLanguageFolders(),
            backend: {
                loadPath: (lng, ns) => {
                    const projectPath = path_1.default.join(this.localesFolder, `${lng}/${ns}.json`);
                    const nodePath = path_1.default.join(this.nodeModulesFolder, `${lng}/${ns}.json`);
                    return fs_1.default.existsSync(projectPath) ? projectPath : nodePath;
                }
            }
        });
    }
    static getInstance(localesFolder, nameSpaces, lang) {
        if (!i18nCh.instance) {
            i18nCh.instance = new i18nCh(localesFolder, nameSpaces, lang);
        }
        return i18nCh.instance;
    }
    loadAllNamespaces() {
        const allNamespaces = [
            this.loadNamespacesFromFolder(this.localesFolder),
            this.loadNamespacesFromFolder(this.nodeModulesFolder)
        ];
        return [...new Set(allNamespaces.flat())];
    }
    loadNamespacesFromFolder(baseFolder) {
        const folderPath = path_1.default.join(baseFolder, "en");
        try {
            return fs_1.default.readdirSync(folderPath)
                .filter(file => path_1.default.extname(file) === ".json")
                .map(file => path_1.default.basename(file, ".json"));
        }
        catch (error) {
            (0, log_1.default)(`Error reading directory ${folderPath}: ${error}`);
            return [];
        }
    }
    getLanguageFolders() {
        const allFolders = [
            this.getFoldersFromPath(this.localesFolder),
            this.getFoldersFromPath(this.nodeModulesFolder)
        ];
        return [...new Set(allFolders.flat())];
    }
    getFoldersFromPath(folderPath) {
        try {
            return (0, fs_1.readdirSync)(folderPath).filter((fileName) => {
                const joinedPath = path_1.default.join(folderPath, fileName);
                return (0, fs_1.lstatSync)(joinedPath).isDirectory();
            });
        }
        catch (error) {
            (0, log_1.default)(`Error reading language folders from ${folderPath}: ${error}`);
            return [];
        }
    }
    changeLanguage(lang) {
        this.i18nInst.changeLanguage(lang, (err) => {
            if (err) {
                throw new Error(`i18nCh changeLanguage error: ${err}`);
            }
        });
    }
    loadGenericKey(lang, ns, value, unescape, vars = {}, path = '') {
        const data = {};
        for (const [key, val] of Object.entries(value)) {
            (0, log_1.default)(`${key}`);
            const currentPath = path ? `${path}.${key}` : key;
            if (typeof val === 'object' && val !== null) {
                data[key] = this.loadGenericKey(lang, ns, val, unescape, vars, currentPath);
            }
            else {
                data[key] = this.i18nInst.t(currentPath, {
                    lng: lang,
                    ns: ns,
                    ...vars,
                    interpolation: {
                        escapeValue: !unescape
                    }
                });
            }
        }
        return data;
    }
    resolveNamespacesKeys(lang, vars = {}, unescape = false) {
        let data = {};
        if (this.i18nInst && this.nameSpaces) {
            this.changeLanguage(lang);
            const keysValuesList = this.i18nInst.getDataByLanguage("en");
            if (keysValuesList !== undefined) {
                for (const [ns, value] of Object.entries(keysValuesList)) {
                    (0, log_1.default)(`${ns}: ${this.nameSpaces}`);
                    if (this.nameSpaces.includes(ns)) {
                        (0, log_1.default)(`${ns}`);
                        data = {
                            ...data,
                            ...this.loadGenericKey(lang, ns, value, unescape, vars)
                        };
                    }
                }
            }
        }
        return data;
    }
    resolveSingleKey(key, lang, vars = {}, unescape = false) {
        let t = key;
        if (this.i18nInst) {
            this.changeLanguage(lang);
            t = this.i18nInst.t(key, {
                lng: lang,
                ns: this.nameSpaces,
                ...vars,
                interpolation: {
                    escapeValue: !unescape
                }
            });
            (0, log_1.default)(`searched for key:${key} lang:${lang} and got: ${t}`);
        }
        return t;
    }
    loadNamespaces(nameSpaces = []) {
        if (nameSpaces.length > 0 && this.i18nInst) {
            this.i18nInst.loadNamespaces(nameSpaces, (err) => {
                throw new Error(`i18nCh loadNamespaces error - unable to load namespaces: ${nameSpaces} - ${err}`);
            });
        }
    }
    getResourceBundle(lng, ns) {
        return this.i18nInst.getResourceBundle(lng, ns);
    }
}
exports.default = i18nCh;
//# sourceMappingURL=i18nCh.js.map