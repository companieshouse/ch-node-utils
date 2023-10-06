"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const i18next_fs_backend_1 = tslib_1.__importDefault(require("i18next-fs-backend"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importStar(require("fs"));
class i18nCh {
    constructor(localesFolder = "", nameSpaces = [], lang = "en") {
        this.nameSpaces = [];
        try {
            if (!localesFolder) {
                throw new Error("i18nCh initialization error: path to locales must be provided");
            }
            this.localesFolder = localesFolder;
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
                preload: (0, fs_1.readdirSync)(localesFolder).filter((fileName) => {
                    const joinedPath = path_1.default.join(localesFolder, fileName);
                    return (0, fs_1.lstatSync)(joinedPath).isDirectory();
                }),
                backend: {
                    loadPath: path_1.default.join(localesFolder, `{{lng}}/{{ns}}.json`)
                }
            });
        }
        catch (err) {
            throw err;
        }
    }
    static getInstance(localesFolder, nameSpaces, lang) {
        if (!i18nCh.instance) {
            i18nCh.instance = new i18nCh(localesFolder, nameSpaces, lang);
        }
        return i18nCh.instance;
    }
    loadAllNamespaces() {
        const jsonFiles = [];
        if (this.localesFolder) {
            fs_1.default.readdirSync(path_1.default.join(this.localesFolder, "en")).forEach((file) => {
                if (path_1.default.extname(file) === ".json") {
                    jsonFiles.push(path_1.default.basename(file, ".json"));
                }
            });
        }
        return jsonFiles;
    }
    changeLanguage(lang) {
        this.i18nInst.changeLanguage(lang, (err) => {
            if (err)
                throw new Error(`i18nCh changeLanguage error: ${err}`);
        });
    }
    resolveNamespacesKeys(lang, vars = {}) {
        let data = {};
        try {
            if (this.i18nInst && this.nameSpaces) {
                this.changeLanguage(lang);
                const keysValuesList = this.i18nInst.getDataByLanguage("en");
                if (keysValuesList !== undefined) {
                    for (const [ns, value] of Object.entries(keysValuesList)) {
                        console.log(`${ns}: ${this.nameSpaces}`);
                        if (this.nameSpaces.includes(ns)) {
                            console.log(`${ns}`);
                            for (const [key] of Object.entries(value)) {
                                console.log(`${key}`);
                                data[key] = this.i18nInst.t(key, { lng: lang, ns: ns, vars });
                            }
                        }
                    }
                }
            }
        }
        catch (err) {
            throw err;
        }
        return data;
    }
    resolveSingleKey(key, lang, vars = {}) {
        let t = key;
        if (this.i18nInst) {
            try {
                this.changeLanguage(lang);
                t = this.i18nInst.t(key, { lng: lang, ns: this.nameSpaces, vars });
                console.log(`searched for key:${key} lang:${lang} and got: ${t}`);
            }
            catch (err) {
                throw err;
            }
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
}
exports.default = i18nCh;
//# sourceMappingURL=i18nCh.js.map