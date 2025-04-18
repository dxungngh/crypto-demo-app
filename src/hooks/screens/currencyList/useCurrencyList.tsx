import { useTranslation } from 'react-i18next';
import { useCurrencyInfo } from '@/hooks/domain/currencyInfo/useCurrencyInfo';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/common';
import { CURRENCY_TYPE } from '@/constants';
import { CurrencyInfo } from '@/hooks/domain/currencyInfo/schema';

export const useCurrencyList = (isCurrencyList: boolean, isFiatList: boolean) => {
    const { t } = useTranslation();
    const { fetchCurrencyList } = useCurrencyInfo();
    const [inputText, setInputText] = useState<string>('');

    const debouncedInput = useDebounce(inputText);
    const hasInput = debouncedInput.trim().length > 0;

    // Fetch data from MMKV or remote (cached by react-query)
    const cryptoQuery = fetchCurrencyList(CURRENCY_TYPE.CRYPTO);
    const fiatQuery = fetchCurrencyList(CURRENCY_TYPE.FIAT);

    // Search filter function (local only)
    const filterList = (list: CurrencyInfo[], keyword: string): CurrencyInfo[] => {
        const lowerQuery = keyword.toLowerCase().trim();

        return list.filter((item) => {
            const name = item.name.toLowerCase();
            const symbol = item.symbol.toLowerCase();

            return (
                name.startsWith(lowerQuery) ||
                name.includes(' ' + lowerQuery) ||
                symbol.startsWith(lowerQuery)
            );
        });
    };

    const filteredCrypto = useMemo(() => {
        return hasInput ? filterList(cryptoQuery.data ?? [], debouncedInput) : cryptoQuery.data ?? [];
    }, [cryptoQuery.data, debouncedInput, hasInput]);

    const filteredFiat = useMemo(() => {
        return hasInput ? filterList(fiatQuery.data ?? [], debouncedInput) : fiatQuery.data ?? [];
    }, [fiatQuery.data, debouncedInput, hasInput]);

    const dataList = useMemo(() => {
        if (isCurrencyList && isFiatList) return [...filteredCrypto, ...filteredFiat];
        if (isCurrencyList) return filteredCrypto;
        if (isFiatList) return filteredFiat;
        return [];
    }, [filteredCrypto, filteredFiat, isCurrencyList, isFiatList]);

    const isLoading = useMemo(() => {
        if (isCurrencyList && isFiatList) {
            return cryptoQuery.isLoading || fiatQuery.isLoading;
        }
        if (isCurrencyList) return cryptoQuery.isLoading;
        if (isFiatList) return fiatQuery.isLoading;
        return false;
    }, [cryptoQuery.isLoading, fiatQuery.isLoading, isCurrencyList, isFiatList]);

    const placeholder = useMemo(() => {
        if (isCurrencyList && !isFiatList) {
            return t('screen_currency_list.search_crypto');
        } else if (!isCurrencyList && isFiatList) {
            return t('screen_currency_list.search_fiat');
        } else {
            return t('screen_currency_list.search_all');
        }
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
