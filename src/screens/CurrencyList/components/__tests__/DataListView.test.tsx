// __tests__/DataListView.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import DataListView from '../DataListView';
import ThemeProvider from '@/theme/ThemeProvider/ThemeProvider';
import { MMKV } from 'react-native-mmkv';
import { CurrencyInfo } from '@/hooks/domain/currencyInfo/schema';

jest.mock('react-native-mmkv');

// Mock child component
jest.mock('../DataItemView', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return ({ item }: any) => <Text testID="data-item">{item.name}</Text>;
});

const mockStorage = new MMKV();

const renderWithProviders = (ui: React.ReactElement) => {
    return render(<ThemeProvider storage={mockStorage}>{ui}</ThemeProvider>);
};

describe('DataListView', () => {
    const mockData: CurrencyInfo[] = [
        {
            id: '1',
            name: 'Bitcoin',
            symbol: 'BTC',
            code: 'BTC',
            type: 'crypto',
        },
        {
            id: '2',
            name: 'Ethereum',
            symbol: 'ETH',
            code: 'ETH',
            type: 'crypto',
        },
    ];

    it('renders the correct number of DataItemView components', () => {
        const { getAllByTestId } = renderWithProviders(<DataListView dataList={mockData} />);
        const items = getAllByTestId('data-item');
        expect(items).toHaveLength(2);
    });

    it('renders item names correctly', () => {
        const { getByText } = renderWithProviders(<DataListView dataList={mockData} />);
        expect(getByText('Bitcoin')).toBeTruthy();
        expect(getByText('Ethereum')).toBeTruthy();
    });
});
