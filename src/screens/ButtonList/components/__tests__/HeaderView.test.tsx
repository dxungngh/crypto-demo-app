import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import HeaderView from '../HeaderView';
import ThemeProvider from '@/theme/ThemeProvider/ThemeProvider';
import { MMKV } from 'react-native-mmkv';

// ✅ Định nghĩa mock rõ ràng ở ngoài scope
const mockToggleLanguage = jest.fn();

// Mock useTheme
jest.mock('@/theme', () => ({
    useTheme: () => ({
        layout: {
            row: [],
            justifyEnd: [],
            fullWidth: [],
            itemsCenter: [],
        },
    }),
}));

// ✅ Sử dụng lại mock ở đây
jest.mock('@/hooks', () => ({
    useI18n: () => ({
        toggleLanguage: mockToggleLanguage,
    }),
}));

// Mock CustomButton
jest.mock('@/components/foundations/CustomButton', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return ({ onPress, languageKey }: any) => (
        <Text onPress={onPress} testID="toggle-language">
            {languageKey}
        </Text>
    );
});

const renderWithProviders = (ui: React.ReactElement) => {
    return render(<ThemeProvider storage={new MMKV()}>{ui}</ThemeProvider>);
};

describe('HeaderView component', () => {
    beforeEach(() => {
        mockToggleLanguage.mockClear();
    });

    it('calls toggleLanguage when button is pressed', () => {
        const { getByTestId } = renderWithProviders(<HeaderView />);
        fireEvent.press(getByTestId('toggle-language'));
        expect(mockToggleLanguage).toHaveBeenCalled(); // ✅ sẽ pass
    });
});
