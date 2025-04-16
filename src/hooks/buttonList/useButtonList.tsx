import { useEffect, useState } from 'react';
import { useCurrencyInfo } from '@/hooks/domain/currencyInfo/useCurrencyInfo';
import { useTranslation } from 'react-i18next';

export const useButtonList = () => {
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
        clearData
    };
};
