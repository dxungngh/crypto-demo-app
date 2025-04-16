import { useEffect, useState } from 'react';
import { useCurrencyInfo } from '@/hooks/domain/currencyInfo/useCurrencyInfo';

export const useButtonList = () => {
    const {
        saveAllData,
        saveStatus,
        clearData,
        clearStatus,
        resetClearStatus,
        resetSaveStatus
    } = useCurrencyInfo();

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        console.log('useButtonList: ' + clearStatus + ' --- ' + saveStatus);
        if (saveStatus === 'success') {
            setAlertTitle('screen_button_list.success_title');
            setAlertContent('screen_button_list.success_insert');
            setAlertVisible(true);
        } else if (clearStatus === 'success') {
            setAlertTitle('screen_button_list.success_title');
            setAlertContent('screen_button_list.success_clear');
            setAlertVisible(true);
        }
    }, [saveStatus, clearStatus]);

    const closeAlert = () => {
        console.log('closeAlert');
        setAlertVisible(false);
        resetClearStatus();
        resetSaveStatus();
    }

    return {
        saveAllData,
        saveStatus,
        clearData,
        clearStatus,
        isAlertVisible,
        alertTitle,
        alertContent,
        closeAlert,
    };
};
