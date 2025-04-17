import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CurrencyList from '../CurrencyList';
import * as currencyListHook from '@/hooks/currencyList';
import ThemeProvider from '@/theme/ThemeProvider/ThemeProvider';
import { MMKV } from 'react-native-mmkv';

jest.mock('react-native-mmkv');
jest.mock('@/hooks/currencyList');
jest.mock('@/components/templates/SafeScreen/SafeScreen', () => ({ children }: any) => <>{children}</>);
jest.mock('@/components/foundations/CustomLoading', () => {
    const React = require('react');
    const { View } = require('react-native');
    return () => <View testID="custom-loading" />;
});
jest.mock('@/components/foundations/CustomAlert', () => () => <></>);
jest.mock('@/components/foundations/CustomButton', () => ({ onPress }: any) => <button onClick={onPress}>Button</button>);
jest.mock('@/components/foundations/CustomText', () => () => <></>);
jest.mock('../components/HeaderView', () => {
    const React = require('react');
    const { Text, TouchableOpacity, TextInput } = require('react-native');
    return ({ placeholder, onBackPress, onTextChanged }: any) => (
        <>
            <TouchableOpacity onPress={onBackPress}>
                <Text>Back</Text>
            </TouchableOpacity>
            <TextInput
                placeholder={placeholder}
                onChangeText={onTextChanged}
                testID="search-input"
            />
        </>
    );
});
jest.mock('../components/DataListView', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return ({ dataList }: any) => <Text>{`${dataList.length} items`}</Text>;
});
jest.mock('../components/NoDataView', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return () => <Text>No Data</Text>;
});

const mockStorage = new MMKV();

const renderWithProviders = (ui: React.ReactElement) => {
    return render(<ThemeProvider storage={mockStorage}>{ui}</ThemeProvider>);
};

describe('CurrencyList Screen', () => {
    const mockNavigation = { goBack: jest.fn() };
    const mockRoute = {
        params: {
            isCurrencyList: true,
            isFiatList: false,
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading indicator when loading', () => {
        (currencyListHook as any).useCurrencyList = jest.fn(() => ({
            dataList: [],
            placeholder: 'Search...',
            setInputText: jest.fn(),
            isLoading: true,
            hasData: false,
        }));

        const { getByTestId } = renderWithProviders(
            <CurrencyList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        expect(getByTestId('custom-loading')).toBeTruthy();
    });

    it('should render data list when data exists', () => {
        (currencyListHook as any).useCurrencyList = jest.fn(() => ({
            dataList: [{ id: 'BTC', name: 'Bitcoin', symbol: 'BTC', code: '', type: 'crypto' }],
            placeholder: 'Search...',
            setInputText: jest.fn(),
            isLoading: false,
            hasData: true,
        }));

        const { getByText } = renderWithProviders(
            <CurrencyList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        expect(getByText('1 items')).toBeTruthy();
    });

    it('should render NoDataView when no data exists', () => {
        (currencyListHook as any).useCurrencyList = jest.fn(() => ({
            dataList: [],
            placeholder: 'Search...',
            setInputText: jest.fn(),
            isLoading: false,
            hasData: false,
        }));

        const { getByText } = renderWithProviders(
            <CurrencyList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        expect(getByText('No Data')).toBeTruthy();
    });

    it('should call goBack when back button is pressed', () => {
        (currencyListHook as any).useCurrencyList = jest.fn(() => ({
            dataList: [],
            placeholder: 'Search...',
            setInputText: jest.fn(),
            isLoading: false,
            hasData: false,
        }));

        const { getByText } = renderWithProviders(
            <CurrencyList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        fireEvent.press(getByText('Back'));
        expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    it('should update input when text is typed', () => {
        const setInputText = jest.fn();
        (currencyListHook as any).useCurrencyList = jest.fn(() => ({
            dataList: [],
            placeholder: 'Search...',
            setInputText,
            isLoading: false,
            hasData: false,
        }));

        const { getByTestId } = renderWithProviders(
            <CurrencyList navigation={mockNavigation as any} route={mockRoute as any} />
        );

        fireEvent.changeText(getByTestId('search-input'), 'btc');
        expect(setInputText).toHaveBeenCalledWith('btc');
    });

});
