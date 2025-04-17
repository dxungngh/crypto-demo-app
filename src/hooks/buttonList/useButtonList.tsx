import { useEffect, useState } from 'react';
import { useCurrencyInfo } from '@/hooks/domain/currencyInfo/useCurrencyInfo';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { Paths } from '@/navigation/paths';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';

export const useButtonList = (navigation: NavigationProp<RootStackParamList>) => {
    const { t } = useTranslation();
    const {
        clearData,
        clearStatus,
        saveAllData,
        saveStatus,
        resetClearStatus,
        resetSaveStatus,
    } = useCurrencyInfo();

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        console.log('clearStatus', clearStatus);
        console.log('saveStatus', saveStatus);
        if (saveStatus === 'success') {
            setAlertTitle(t('screen_button_list.success_title'));
            setAlertContent(t('screen_button_list.success_insert'));
            setAlertVisible(true);
        } else if (clearStatus === 'success') {
            setAlertTitle(t('screen_button_list.success_title'));
            setAlertContent(t('screen_button_list.success_clear'));
            setAlertVisible(true);
        }
    }, [saveStatus, clearStatus]);

    const handleNavigateToCryptoList = useCallback(() => {
        navigation.navigate(Paths.CurrencyList, { isCurrencyList: true, isFiatList: false });
    }, [navigation]);

    const handleNavigateToFiatList = useCallback(() => {
        navigation.navigate(Paths.CurrencyList, { isCurrencyList: false, isFiatList: true });
    }, [navigation]);

    const handleNavigateToShowAll = useCallback(() => {
        navigation.navigate(Paths.CurrencyList, { isCurrencyList: true, isFiatList: true });
    }, [navigation]);

    const closeAlert = () => {
        setAlertVisible(false);
        resetClearStatus();
        resetSaveStatus();
    };

    return {
        isAlertVisible,
        alertTitle,
        alertContent,
        closeAlert,
        saveAllData,
        clearData,
        handleNavigateToCryptoList,
        handleNavigateToFiatList,
        handleNavigateToShowAll
    };
};
