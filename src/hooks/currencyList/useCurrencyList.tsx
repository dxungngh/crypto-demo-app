import { useTranslation } from 'react-i18next';
import { useCurrencyInfo } from '@/hooks/domain/currencyInfo/useCurrencyInfo';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/common';

export const useCurrencyList = (isCurrencyList: boolean, isFiatList: boolean) => {
    const { t } = useTranslation();
    const { fetchCurrencyList, searchCurrencyList } = useCurrencyInfo();
    const [inputText, setInputText] = useState<string>('');

    const debouncedInput = useDebounce(inputText);

    const hasInput = debouncedInput.trim().length > 0;

    const cryptoQuery = fetchCurrencyList('crypto');
    const fiatQuery = fetchCurrencyList('fiat');

    const cryptoSearchQuery = searchCurrencyList(debouncedInput, 'crypto');
    const fiatSearchQuery = searchCurrencyList(debouncedInput, 'fiat');

    const dataList = useMemo(() => {
        if (hasInput) {
            if (isCurrencyList) return cryptoSearchQuery.data;
            if (isFiatList) return fiatSearchQuery.data;
        } else {
            if (isCurrencyList) return cryptoQuery.data;
            if (isFiatList) return fiatQuery.data;
        }
        return [];
    }, [
        hasInput,
        isCurrencyList,
        isFiatList,
        cryptoQuery.data,
        fiatQuery.data,
        cryptoSearchQuery.data,
        fiatSearchQuery.data,
    ]);

    const isLoading = useMemo(() => {
        if (isCurrencyList) {
            return hasInput ? cryptoSearchQuery.isLoading : cryptoQuery.isLoading;
        }
        if (isFiatList) {
            return hasInput ? fiatSearchQuery.isLoading : fiatQuery.isLoading;
        }
        return false;
    }, [
        hasInput,
        isCurrencyList,
        isFiatList,
        cryptoQuery.isLoading,
        fiatQuery.isLoading,
        cryptoSearchQuery.isLoading,
        fiatSearchQuery.isLoading,
    ]);

    const placeholder = useMemo(() => {
        if (isCurrencyList) return t('screen_currency_list.search_crypto');
        if (isFiatList) return t('screen_currency_list.search_fiat');
        return '';
    }, [isCurrencyList, isFiatList, t]);

    const hasData = useMemo(() => Array.isArray(dataList) && dataList.length > 0, [dataList]);

    return {
        dataList,
        isLoading,
        placeholder,
        inputText,
        setInputText,
        hasData,
    };
};
