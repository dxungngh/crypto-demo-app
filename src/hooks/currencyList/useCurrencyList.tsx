import { useTranslation } from 'react-i18next';
import { useCurrencyInfo } from '@/hooks/domain/currencyInfo/useCurrencyInfo';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks/common';
import { CURRENCY_TYPE } from '@/constants';

export const useCurrencyList = (isCurrencyList: boolean, isFiatList: boolean) => {
    const { t } = useTranslation();
    const { fetchCurrencyList, searchCurrencyList } = useCurrencyInfo();
    const [inputText, setInputText] = useState<string>('');

    const debouncedInput = useDebounce(inputText);
    const hasInput = debouncedInput.trim().length > 0;

    const cryptoQuery = fetchCurrencyList(CURRENCY_TYPE.CRYPTO);
    const fiatQuery = fetchCurrencyList(CURRENCY_TYPE.FIAT);

    const cryptoSearchQuery = searchCurrencyList(debouncedInput, CURRENCY_TYPE.CRYPTO);
    const fiatSearchQuery = searchCurrencyList(debouncedInput, CURRENCY_TYPE.FIAT);

    const dataList = useMemo(() => {
        if (hasInput) {
            if (isCurrencyList && isFiatList) {
                return [
                    ...(cryptoSearchQuery.data ?? []),
                    ...(fiatSearchQuery.data ?? []),
                ];
            } else if (isCurrencyList) {
                return cryptoSearchQuery.data ?? [];
            } else if (isFiatList) {
                return fiatSearchQuery.data ?? [];
            } else {
                return [];
            }
        } else {
            if (isCurrencyList && isFiatList) {
                return [
                    ...(cryptoQuery.data ?? []),
                    ...(fiatQuery.data ?? []),
                ];
            } else if (isCurrencyList) {
                return cryptoQuery.data ?? [];
            } else if (isFiatList) {
                return fiatQuery.data ?? [];
            } else {
                return [];
            }
        }
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
        if (isCurrencyList && isFiatList) {
            return hasInput
                ? (cryptoSearchQuery.isLoading || fiatSearchQuery.isLoading)
                : (cryptoQuery.isLoading || fiatQuery.isLoading);
        } else if (isCurrencyList) {
            return hasInput ? cryptoSearchQuery.isLoading : cryptoQuery.isLoading;
        } else if (isFiatList) {
            return hasInput ? fiatSearchQuery.isLoading : fiatQuery.isLoading;
        } else {
            return false;
        }
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
