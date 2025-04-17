import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ButtonList from '../ButtonList';
import ThemeProvider from '@/theme/ThemeProvider/ThemeProvider';
import { MMKV } from 'react-native-mmkv';
import * as buttonListHook from '@/hooks/buttonList/useButtonList';
import { Paths } from '@/navigation/paths';

// Mock MMKV
jest.mock('react-native-mmkv');

jest.mock('@/components/templates/SafeScreen/SafeScreen', () => ({ children }: any) => <>{children}</>);
jest.mock('@/components/foundations/CustomAlert', () => {
    const React = require('react');
    const { View, Text } = require('react-native');
    return ({ isVisible, title, content, onClose }: any) =>
        isVisible ? (
            <View testID="custom-alert">
                <Text>{title}</Text>
                <Text>{content}</Text>
                <Text onPress={onClose}>Close</Text>
            </View>
        ) : null;
});
jest.mock('@/components/foundations/CustomButton', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return ({ onPress, languageKey }: any) => (
        <Text onPress={onPress}>{languageKey}</Text>
    );
});
jest.mock('@/screens/ButtonList/components/HeaderView', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return () => <Text testID="header-view">Header</Text>;
});

const mockStorage = new MMKV();

const renderWithProviders = (ui: React.ReactElement) => {
    return render(<ThemeProvider storage={mockStorage}>{ui}</ThemeProvider>);
};

describe('ButtonList screen', () => {
    const mockNavigation = { navigate: jest.fn() };
    const mockRoute = {
        key: 'ButtonList',
        name: Paths.ButtonList,
        params: {},
    };

    const setupMockHook = (overrides: Partial<ReturnType<typeof buttonListHook.useButtonList>> = {}) => {
        jest.spyOn(buttonListHook, 'useButtonList').mockReturnValue({
            isAlertVisible: false,
            alertTitle: '',
            alertContent: '',
            closeAlert: jest.fn(),
            clearData: jest.fn(),
            saveAllData: jest.fn(),
            handleNavigateToCryptoList: jest.fn(),
            handleNavigateToFiatList: jest.fn(),
            handleNavigateToShowAll: jest.fn(),
            ...overrides,
        });
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render all buttons', () => {
        setupMockHook();
        const { getByText } = renderWithProviders(
            <ButtonList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        expect(getByText('screen_button_list.clear_data')).toBeTruthy();
        expect(getByText('screen_button_list.insert_data')).toBeTruthy();
        expect(getByText('screen_button_list.list_a')).toBeTruthy();
        expect(getByText('screen_button_list.list_b')).toBeTruthy();
        expect(getByText('screen_button_list.list_all')).toBeTruthy();
    });

    it('should handle clearData on button press', () => {
        const clearData = jest.fn();
        setupMockHook({ clearData });

        const { getByText } = renderWithProviders(
            <ButtonList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        fireEvent.press(getByText('screen_button_list.clear_data'));
        expect(clearData).toHaveBeenCalled();
    });

    it('should handle saveAllData on button press', () => {
        const saveAllData = jest.fn();
        setupMockHook({ saveAllData });

        const { getByText } = renderWithProviders(
            <ButtonList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        fireEvent.press(getByText('screen_button_list.insert_data'));
        expect(saveAllData).toHaveBeenCalled();
    });

    // ✅ Added: Test handleNavigateToCryptoList
    it('should navigate to crypto list', () => {
        const handleNavigateToCryptoList = jest.fn();
        setupMockHook({ handleNavigateToCryptoList });

        const { getByText } = renderWithProviders(
            <ButtonList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        fireEvent.press(getByText('screen_button_list.list_a'));
        expect(handleNavigateToCryptoList).toHaveBeenCalled();
    });

    // ✅ Added: Test handleNavigateToFiatList
    it('should navigate to fiat list', () => {
        const handleNavigateToFiatList = jest.fn();
        setupMockHook({ handleNavigateToFiatList });

        const { getByText } = renderWithProviders(
            <ButtonList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        fireEvent.press(getByText('screen_button_list.list_b'));
        expect(handleNavigateToFiatList).toHaveBeenCalled();
    });

    // ✅ Added: Test handleNavigateToShowAll
    it('should navigate to show all', () => {
        const handleNavigateToShowAll = jest.fn();
        setupMockHook({ handleNavigateToShowAll });

        const { getByText } = renderWithProviders(
            <ButtonList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        fireEvent.press(getByText('screen_button_list.list_all'));
        expect(handleNavigateToShowAll).toHaveBeenCalled();
    });

    it('should show CustomAlert when isAlertVisible is true', () => {
        setupMockHook({
            isAlertVisible: true,
            alertTitle: 'Success',
            alertContent: 'Data saved successfully',
            closeAlert: jest.fn(),
        });

        const { getByTestId, getByText } = renderWithProviders(
            <ButtonList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        expect(getByTestId('custom-alert')).toBeTruthy();
        expect(getByText('Success')).toBeTruthy();
        expect(getByText('Data saved successfully')).toBeTruthy();
    });

    it('should call closeAlert when alert is closed', () => {
        const closeAlert = jest.fn();
        setupMockHook({
            isAlertVisible: true,
            alertTitle: 'Test',
            alertContent: 'Alert content',
            closeAlert,
        });

        const { getByText } = renderWithProviders(
            <ButtonList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        fireEvent.press(getByText('Close'));
        expect(closeAlert).toHaveBeenCalled();
    });
});
