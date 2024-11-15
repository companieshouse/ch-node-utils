import i18nCh from "../../src/utils/i18nCh";
import LocalesService from "../../src/services/locales/locales.service";
import LanguageNames  from "../../src/utils/languageNames";
import path from "path";


describe("i18nCh", () => {
    const localesFolder = path.join(__dirname, "../locales");
    const lang = "en";
    const locales = i18nCh.getInstance(localesFolder);

    it("should resolve fixedText key from test locales", async () => {

        const fieldName = "fixedText";
        const result = locales.resolveSingleKey(fieldName, lang, { var1:"<a href=http://bbc.uk>BBC</a", var2:"aa2", var3:"aa3"}, false);
        expect(result).toBe("Apply to strike off and dissolve a company");
    });
    it("should resolve variableText (escaped) key from test locales", async () => {

        const fieldName = "variableText";
        const result = locales.resolveSingleKey(fieldName, lang, { var1:"<a href=http://bbc.uk>BBC</a", var2:"aa2", var3:"aa3"}, false);
        expect(result).toBe("Apply to strike off and dissolve a company &lt;a href=http:&#x2F;&#x2F;bbc.uk&gt;BBC&lt;&#x2F;a aa2 aa3 <a href=http:/somehost/someendpoint>some link</a>");
    });
    it("should resolve variableText (unescaped) key from test locales", async () => {

        const fieldName = "variableText";
        const result = locales.resolveSingleKey(fieldName, lang, { var1:"<a href=http://bbc.uk>BBC</a", var2:"aa2", var3:"aa3"}, true);
        expect(result).toBe("Apply to strike off and dissolve a company <a href=http://bbc.uk>BBC</a aa2 aa3 <a href=http:/somehost/someendpoint>some link</a>");
    });
    it("should resolve structured key from test locales", async () => {

        const fieldName = "structured.serviceName";
        const result = locales.resolveSingleKey(fieldName, "cy");
        expect(result).toBe("diddymu cwmni");
    });
    it("should resolve structured block from test locales", async () => {

        const result = locales.resolveNamespacesKeys("cy");
        expect(result.structured.serviceName).toBe("diddymu cwmni");
    });
    it("should resolve structured (variable/escaped) key from test locales", async () => {

        const fieldName = "structured.bundleId";
        const result = locales.resolveSingleKey(fieldName, lang, {var1: "<678>"} );
        expect(result).toBe("1.2.&lt;678&gt;");
    });
    it("should resolve structured (variable/unescaped) key from test locales", async () => {

        const fieldName = "structured.bundleId";
        const result = locales.resolveSingleKey(fieldName, lang, {var1: "<678>"}, true );
        expect(result).toBe("1.2.<678>");
    });
    it("should resolve structured (variable/escaped) block from test locales", async () => {

        const result = locales.resolveNamespacesKeys(lang, {var1: "<678>"} );
        expect(result.structured.bundleId).toBe("1.2.&lt;678&gt;");
    });
    it("should resolve structured (variable/unescaped) block from test locales", async () => {

        const result = locales.resolveNamespacesKeys(lang, {var1: "<678>"}, true );
        expect(result.structured.bundleId).toBe("1.2.<678>");
    });
    it("should resolve structured variables (escaped) on key from test locales", async () => {

        const fieldName = "T1_P300";
        const result = locales.resolveSingleKey(fieldName, lang, {vars: { var3: "1.2.<678>"}} );
        expect(result).toBe("It costs £8 and you'll 1.2.&lt;678&gt; need:");
    });
    it("should resolve structured variables (unescaped) on key from test locales", async () => {

        const fieldName = "T1_P300";
        const result = locales.resolveSingleKey(fieldName, lang, {vars: { var3: "1.2.<678>"}}, true );
        expect(result).toBe("It costs £8 and you'll 1.2.<678> need:");
    });
    it("should resolve structured variables (escaped) on namespaces from test locales", async () => {

        const result = locales.resolveNamespacesKeys(lang, {vars: { var3: "1.2.<678>"}} );
        expect(result.T1_P300).toBe("It costs £8 and you'll 1.2.&lt;678&gt; need:");
    });
    it("should resolve structured variables (unescaped) on namespaces from test locales", async () => {

        const result = locales.resolveNamespacesKeys(lang, {vars: { var3: "1.2.<678>"}}, true );
        expect(result.T1_P300).toBe("It costs £8 and you'll 1.2.<678> need:");
    });

});
