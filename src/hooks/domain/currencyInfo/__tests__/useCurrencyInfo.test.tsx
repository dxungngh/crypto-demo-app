import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCurrencyInfo } from '../useCurrencyInfo';
import * as CurrencyInfoService from '@/hooks/domain/currencyInfo/currencyInfoService';
import { CurrencyInfo } from '@/hooks/domain/currencyInfo/schema';

const mockCryptoList: CurrencyInfo[] = [
    { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', code: '', type: 'crypto' },
];

const mockFiatList: CurrencyInfo[] = [
    { id: 'USD', name: 'US Dollar', symbol: '$', code: 'USD', type: 'fiat' },
];

// Mock the service
jest.mock('@/hooks/domain/currencyInfo/currencyInfoService');

const createWrapper = () => {
    const queryClient = new QueryClient();

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    );
};

describe('useCurrencyInfo hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches crypto list', async () => {
        (CurrencyInfoService.CurrencyInfoService.getByType as jest.Mock).mockResolvedValueOnce(mockCryptoList);

        const { result, waitFor } = renderHook(() => useCurrencyInfo().fetchCurrencyList('crypto'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => result.current.isSuccess);
        expect(result.current.data).toEqual(mockCryptoList);
    });

    it('searches currency list by text', async () => {
        (CurrencyInfoService.CurrencyInfoService.search as jest.Mock).mockResolvedValueOnce(mockCryptoList);

        const { result, waitFor } = renderHook(() => useCurrencyInfo().searchCurrencyList('bit', 'crypto'), {
            wrapper: createWrapper(),
        });

        await waitFor(() => result.current.isSuccess);
        expect(result.current.data).toEqual(mockCryptoList);
    });

    it('calls saveAllData correctly', async () => {
        const saveMock = CurrencyInfoService.CurrencyInfoService.saveCryptoList as jest.Mock;
        saveMock.mockResolvedValueOnce(undefined);

        const { result } = renderHook(() => useCurrencyInfo(), { wrapper: createWrapper() });

        await act(async () => {
            result.current.saveAllData(mockCryptoList, mockFiatList);
        });

        expect(saveMock).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({ type: 'crypto' }),
                expect.objectContaining({ type: 'fiat' }),
            ])
        );
    });

    it('calls clearData correctly', async () => {
        const clearMock = CurrencyInfoService.CurrencyInfoService.clearAll as jest.Mock;
        clearMock.mockResolvedValueOnce(undefined);

        const { result } = renderHook(() => useCurrencyInfo(), { wrapper: createWrapper() });

        await act(async () => {
            result.current.clearData();
        });

        expect(clearMock).toHaveBeenCalled();
    });

    it('resets save status', () => {
        const { result } = renderHook(() => useCurrencyInfo(), { wrapper: createWrapper() });

        expect(() => result.current.resetSaveStatus()).not.toThrow();
    });

    it('resets clear status', () => {
        const { result } = renderHook(() => useCurrencyInfo(), { wrapper: createWrapper() });

        expect(() => result.current.resetClearStatus()).not.toThrow();
    });
});
