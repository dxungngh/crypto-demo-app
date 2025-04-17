import React from 'react';
import { render } from '@testing-library/react-native';
import DataItemView from '../DataItemView';
import { MMKV } from 'react-native-mmkv';
import ThemeProvider from '@/theme/ThemeProvider/ThemeProvider';
import { CurrencyInfo } from '@/hooks/domain/currencyInfo/schema';

jest.mock('react-native-mmkv');

jest.mock('@/screens/CurrencyList/components/Avatar', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return ({ symbol }: any) => <Text testID="avatar-mock">{symbol}</Text>;
});

jest.mock('@/components/atoms/IconByVariant/IconByVariant', () => {
    const React = require('react');
    const { View } = require('react-native');
    return ({ path }: any) => <View testID={`icon-${path}`} />;
});

jest.mock('@/components/foundations/CustomText', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return {
        CustomTextBodyLarge: ({ children }: any) => <Text testID="text-body-large">{children}</Text>,
    };
});

const mockStorage = new MMKV();
const renderWithProviders = (ui: React.ReactElement) =>
    render(<ThemeProvider storage={mockStorage}>{ui}</ThemeProvider>);

describe('DataItemView component', () => {
    const mockItem: CurrencyInfo = {
        id: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
        code: 'BTC',
        type: 'crypto',
    };

    it('renders currency name and symbol correctly', () => {
        const { getByText, getAllByTestId, getAllByText } = renderWithProviders(<DataItemView item={mockItem} />);

        expect(getByText('Bitcoin')).toBeTruthy();

        const btcTexts = getAllByText('BTC');
        expect(btcTexts).toHaveLength(2); // Avatar + Symbol

        // Ensure two body texts rendered (name + symbol)
        expect(getAllByTestId('text-body-large')).toHaveLength(2);
    });

    it('renders Avatar with correct symbol', () => {
        const { getByTestId } = renderWithProviders(<DataItemView item={mockItem} />);

        const avatar = getByTestId('avatar-mock');
        expect(avatar).toBeTruthy();
        expect(avatar.props.children).toBe('BTC');
    });

    it('renders IconByVariant with correct props', () => {
        const { getByTestId } = renderWithProviders(<DataItemView item={mockItem} />);

        const icon = getByTestId('icon-chevron_right');
        expect(icon).toBeTruthy();
    });
});
