import React from 'react';
import { render } from '@testing-library/react-native';
import NoDataView from '../NoDataView';
import ThemeProvider from '@/theme/ThemeProvider/ThemeProvider';
import { MMKV } from 'react-native-mmkv';

// Mock MMKV
jest.mock('react-native-mmkv');

jest.mock('@/components/atoms/IconByVariant/IconByVariant', () => {
    const React = require('react');
    const { View } = require('react-native');
    return ({ path }: any) => <View testID={`icon-${path}`} />;
});

jest.mock('@/components/foundations/CustomText', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return {
        CustomTextHeadingMedium: ({ languageKey, style }: any) => (
            <Text testID="no-data-text" style={style}>
                {languageKey}
            </Text>
        ),
    };
});

const mockStorage = new MMKV();
const renderWithProviders = (ui: React.ReactElement) =>
    render(<ThemeProvider storage={mockStorage}>{ui}</ThemeProvider>);

describe('NoDataView component', () => {
    it('renders empty icon and text correctly', () => {
        const { getByTestId } = renderWithProviders(<NoDataView />);

        expect(getByTestId('icon-empty')).toBeTruthy();
        const text = getByTestId('no-data-text');
        expect(text.props.children).toBe('screen_currency_list.no_data');
    });
});
