import LanguageNames, { NamedIsoCode } from "../../src/utils/languageNames";
import iso6391 from "iso-639-1";
import SubDirs from "../../src/utils/subDirs";

jest.mock("iso-639-1");
jest.mock("../../src/utils/subDirs");

describe("LanguageNames", () => {
  const isoCodes = ["en", "cy"];
  const localesDir = "/path/to/locales";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getNamesArray", () => {
    (iso6391.getName as jest.Mock).mockImplementation((code) => {
      return code === "en" ? "English" : "Welsh";
    });

    const result = LanguageNames.getNamesArray(isoCodes);
    expect(result).toEqual(["English", "Welsh"]);
  });

  test("getNativeNamesArray", () => {
    (iso6391.getNativeName as jest.Mock).mockImplementation((code) => {
      return code === "en" ? "English" : "Cymraeg";
    });

    const result = LanguageNames.getNativeNamesArray(isoCodes);
    expect(result).toEqual(["English", "Cymraeg"]);
  });

  test("getNamesObjectArray", () => {
    (iso6391.getName as jest.Mock).mockImplementation((code) => {
      return code === "en" ? "English" : "Welsh";
    });

    const result = LanguageNames.getNamesObjectArray(isoCodes);
    expect(result).toEqual([
      new NamedIsoCode("en", "English"),
      new NamedIsoCode("cy", "Welsh"),
    ]);
  });

  test("getNativeNamesObjectArray", () => {
    (iso6391.getNativeName as jest.Mock).mockImplementation((code) => {
      return code === "en" ? "English" : "Cymraeg";
    });

    const result = LanguageNames.getNativeNamesObjectArray(isoCodes);
    expect(result).toEqual([
      new NamedIsoCode("en", "English"),
      new NamedIsoCode("cy", "Cymraeg"),
    ]);
  });

  test("sourceLocales", () => {
    (SubDirs.getSubDirs as jest.Mock).mockReturnValue(isoCodes);

    const result = LanguageNames.sourceLocales(localesDir);
    expect(result).toEqual([
      new NamedIsoCode("en", "English"),
      new NamedIsoCode("cy", "Cymraeg"),
    ]);
  });

  test("isSupportedLocale", () => {
    (SubDirs.getSubDirs as jest.Mock).mockReturnValue(isoCodes);

    const result = LanguageNames.isSupportedLocale(localesDir, "en");
    expect(result).toBe(true);

    const resultFalse = LanguageNames.isSupportedLocale(localesDir, "fr");
    expect(resultFalse).toBe(false);
  });
});