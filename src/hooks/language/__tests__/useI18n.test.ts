import i18next from 'i18next';
import { useI18n } from '../useI18n';
import { SupportedLanguages } from '../schema';

jest.mock('i18next', () => ({
    changeLanguage: jest.fn(),
    language: 'en_EN', // default mocked language
}));

describe('useI18n', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should change language to given one', () => {
        const { changeLanguage } = useI18n();
        changeLanguage(SupportedLanguages.CN_CN);

        expect(i18next.changeLanguage).toHaveBeenCalledWith(SupportedLanguages.CN_CN);
    });

    it('should toggle language from EN to CN', () => {
        (i18next.language as string) = SupportedLanguages.EN_EN;
        const { toggleLanguage } = useI18n();

        toggleLanguage();
        expect(i18next.changeLanguage).toHaveBeenCalledWith(SupportedLanguages.CN_CN);
    });

    it('should toggle language from CN to EN', () => {
        (i18next.language as string) = SupportedLanguages.CN_CN;
        const { toggleLanguage } = useI18n();

        toggleLanguage();
        expect(i18next.changeLanguage).toHaveBeenCalledWith(SupportedLanguages.EN_EN);
    });
});
