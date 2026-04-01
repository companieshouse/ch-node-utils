import i18nCh from "../../utils/i18nCh";
export default class LocalesService {
    private static instance;
    enabled: boolean;
    localesFolder: string;
    i18nCh: i18nCh;
    private constructor();
    static getInstance(localesFolder?: string, enabled?: boolean): LocalesService;
}
