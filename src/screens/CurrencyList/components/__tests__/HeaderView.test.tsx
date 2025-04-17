
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import HeaderView from '../HeaderView';
import ThemeProvider from '@/theme/ThemeProvider/ThemeProvider';
import { MMKV } from 'react-native-mmkv';

jest.mock('react-native-mmkv');

// Mock theme provider
const mockStorage = new MMKV();
const renderWithProviders = (ui: React.ReactElement) => {
    return render(<ThemeProvider storage={mockStorage}>{ui}</ThemeProvider>);
};

// Mock child components
jest.mock('@/components/atoms/IconByVariant/IconByVariant', () => {
    const React = require('react');
    const { View } = require('react-native');
    return ({ path }: any) => <View testID={`icon-${path}`} />;
});

jest.mock('@/components/foundations/CustomTextInput', () => {
    const React = require('react');
    const { TextInput } = require('react-native');
    return ({ placeholder, onChangeText }: any) => (
        <TextInput testID="text-input" placeholder={placeholder} onChangeText={onChangeText} />
    );
});

describe('HeaderView component', () => {
    it('renders IconByVariant with back icon', () => {
        const mockFn = jest.fn();
        const { getByTestId } = renderWithProviders(
            <HeaderView onBackPress={mockFn} onTextChanged={() => { }} />
        );
        expect(getByTestId('icon-back')).toBeTruthy();
    });

    it('calls onBackPress when back icon is pressed', () => {
        const mockBackPress = jest.fn();
        const { getByTestId } = renderWithProviders(
            <HeaderView onBackPress={mockBackPress} onTextChanged={() => { }} />
        );
        fireEvent.press(getByTestId('icon-back'));
        expect(mockBackPress).toHaveBeenCalled();
    });

    it('calls onTextChanged when text input changes', () => {
        const mockTextChanged = jest.fn();
        const { getByTestId } = renderWithProviders(
            <HeaderView onTextChanged={mockTextChanged} />
        );
        fireEvent.changeText(getByTestId('text-input'), 'abc');
        expect(mockTextChanged).toHaveBeenCalledWith('abc');
    });

    it('renders placeholder in input', () => {
        const { getByPlaceholderText } = renderWithProviders(
            <HeaderView placeholder="Search here..." onTextChanged={() => { }} />
        );
        expect(getByPlaceholderText('Search here...')).toBeTruthy();
    });
});
