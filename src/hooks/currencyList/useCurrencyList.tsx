import { useTranslation } from 'react-i18next';
import { useCurrencyInfo } from '@/hooks/domain/currencyInfo/useCurrencyInfo';

export const useCurrencyList = (isCurrencyList: boolean, isFiatList: boolean) => {
    const { t } = useTranslation();
    const { fetchCurrencyList } = useCurrencyInfo();

    // Always call hooks at top-level
    const cryptoQuery = fetchCurrencyList('crypto');
    const fiatQuery = fetchCurrencyList('fiat');

    // Decide which data to show
    const dataList = isCurrencyList
        ? cryptoQuery.data
        : isFiatList
            ? fiatQuery.data
            : [];

    const placeholder = isCurrencyList
        ? t('screen_currency_list.search_crypto')
        : isFiatList
            ? t('screen_currency_list.search_fiat')
            : '';

    return {
        dataList,
        placeholder,
        isLoading: isCurrencyList ? cryptoQuery.isLoading : fiatQuery.isLoading,
        isError: isCurrencyList ? cryptoQuery.isError : fiatQuery.isError,
    };
};
