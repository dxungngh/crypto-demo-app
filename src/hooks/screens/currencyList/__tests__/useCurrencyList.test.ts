import { renderHook, act } from '@testing-library/react-hooks';
import { useCurrencyList } from '../useCurrencyList';

// Static mock data with updated IDs
const cryptoData = [
    { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', code: 'BTC', type: 'crypto' },
    { id: 'ETH', name: 'Ethereum', symbol: 'ETH', code: 'ETH', type: 'crypto' },
];
const fiatData = [
    { id: 'USD', name: 'US Dollar', symbol: 'USD', code: 'USD', type: 'fiat' },
    { id: 'EUR', name: 'Euro', symbol: 'EUR', code: 'EUR', type: 'fiat' },
];

// Mocks for i18n and debounce
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('@/hooks/common', () => ({
    useDebounce: (value: string) => value,
}));

// Variable to control loading state per test
let mockIsLoading = { crypto: false, fiat: false };

// Mock implementation of useCurrencyInfo using inline logic
jest.mock('@/hooks/domain/currencyInfo/useCurrencyInfo', () => ({
    useCurrencyInfo: () => ({
        fetchCurrencyList: (type: string) => {
            if (type === 'crypto') {
                return {
                    data: cryptoData,
                    isLoading: mockIsLoading.crypto,
                };
            } else if (type === 'fiat') {
                return {
                    data: fiatData,
                    isLoading: mockIsLoading.fiat,
                };
            }
            return { data: [], isLoading: false };
        },
    }),
}));

describe('useCurrencyList', () => {
    beforeEach(() => {
        mockIsLoading = { crypto: false, fiat: false };
    });

    it('returns all currencies when both types are enabled and no input is provided', () => {
        const { result } = renderHook(() => useCurrencyList(true, true));
        expect(result.current.dataList).toHaveLength(4);
    });

    it('returns only crypto currencies when isCurrencyList is true and isFiatList is false', () => {
        const { result } = renderHook(() => useCurrencyList(true, false));
        expect(result.current.dataList.map((x) => x.id)).toEqual(['BTC', 'ETH']);
    });

    it('returns only fiat currencies when isCurrencyList is false and isFiatList is true', () => {
        const { result } = renderHook(() => useCurrencyList(false, true));
        expect(result.current.dataList.map((x) => x.id)).toEqual(['USD', 'EUR']);
    });

    it('filters by name correctly (e.g., input "bit" matches Bitcoin)', () => {
        const { result } = renderHook(() => useCurrencyList(true, true));
        act(() => result.current.setInputText('bit'));
        expect(result.current.dataList).toHaveLength(1);
        expect(result.current.dataList[0].id).toBe('BTC');
    });

    it('filters by symbol correctly (e.g., input "usd" matches USD)', () => {
        const { result } = renderHook(() => useCurrencyList(true, true));
        act(() => result.current.setInputText('usd'));
        expect(result.current.dataList).toHaveLength(1);
        expect(result.current.dataList[0].id).toBe('USD');
    });

    it('returns empty list and hasData = false when input does not match anything', () => {
        const { result } = renderHook(() => useCurrencyList(true, true));
        act(() => result.current.setInputText('zzz'));
        expect(result.current.dataList).toHaveLength(0);
        expect(result.current.hasData).toBe(false);
    });

    it('returns correct placeholder for crypto only', () => {
        const { result } = renderHook(() => useCurrencyList(true, false));
        expect(result.current.placeholder).toBe('screen_currency_list.search_crypto');
    });

    it('returns correct placeholder for fiat only', () => {
        const { result } = renderHook(() => useCurrencyList(false, true));
        expect(result.current.placeholder).toBe('screen_currency_list.search_fiat');
    });

    it('returns correct placeholder for both types', () => {
        const { result } = renderHook(() => useCurrencyList(true, true));
        expect(result.current.placeholder).toBe('screen_currency_list.search_all');
    });

    describe.each([
        ['both crypto and fiat are loading', { crypto: true, fiat: true }, true],
        ['only crypto is loading', { crypto: true, fiat: false }, true],
        ['only fiat is loading', { crypto: false, fiat: true }, true],
        ['neither is loading', { crypto: false, fiat: false }, false],
    ])('isLoading logic: %s', (_label, loadingState, expected) => {
        it(`should return isLoading = ${expected}`, () => {
            mockIsLoading = loadingState;
            const { result } = renderHook(() => useCurrencyList(true, true));
            expect(result.current.isLoading).toBe(expected);
        });
    });
});
