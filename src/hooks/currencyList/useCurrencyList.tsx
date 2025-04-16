import { useTranslation } from 'react-i18next';
import { useCurrencyInfo } from '@/hooks/domain/currencyInfo/useCurrencyInfo';
import { useState } from 'react';

export const useCurrencyList = (isCurrencyList: boolean, isFiatList: boolean) => {
    const { t } = useTranslation();
    const { fetchCurrencyList, searchCurrencyList } = useCurrencyInfo();
    const [inputText, setInputText] = useState<string>('');

    const cryptoQuery = fetchCurrencyList('crypto');
    const fiatQuery = fetchCurrencyList('fiat');

    const cryptoSearchQuery = searchCurrencyList(inputText, 'crypto');
    const fiatSearchQuery = searchCurrencyList(inputText, 'fiat');

    function getDataList() {
        const hasInput = inputText && inputText.trim().length > 0;
        if (hasInput) {
            if (isCurrencyList) {
                return cryptoSearchQuery.data;
            }
            if (isFiatList) {
                return fiatSearchQuery.data;
            }
        }
        if (isCurrencyList) {
            return cryptoQuery.data;
        }
        if (isFiatList) {
            return fiatQuery.data;
        }
        return [];
    }

    function getIsLoading() {
        const hasInput = inputText.trim().length > 0;
        if (isCurrencyList) {
            return hasInput ? cryptoSearchQuery.isLoading : cryptoQuery.isLoading;
        }
        if (isFiatList) {
            return hasInput ? fiatSearchQuery.isLoading : fiatQuery.isLoading;
        }
        return false;
    }

    function getPlaceholder() {
        if (isCurrencyList) return t('screen_currency_list.search_crypto');
        if (isFiatList) return t('screen_currency_list.search_fiat');
        return '';
    }

    return {
        dataList: getDataList(),
        isLoading: getIsLoading(),
        placeholder: getPlaceholder(),
        inputText,
        setInputText,
    };
};
