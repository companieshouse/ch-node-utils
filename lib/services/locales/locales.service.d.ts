import i18nCh from "../../utils/i18nCh";
export default class LocalesService {
    private static instance;
    enabled: Boolean;
    localesFolder: string;
    i18nCh: i18nCh;
    private constructor();
    static getInstance(localesFolder?: string, enabled?: Boolean): LocalesService;
}
