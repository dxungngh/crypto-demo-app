import { renderHook, act } from '@testing-library/react-hooks';
import { useCurrencyList } from '../useCurrencyList';
import { CURRENCY_TYPE } from '@/constants';

jest.mock('@/hooks/common', () => ({
    useDebounce: (val: string) => val,
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

const mockCryptoData = [{ id: 'BTC', name: 'Bitcoin', symbol: 'BTC' }];
const mockFiatData = [{ "id": "USD", "name": "United States Dollar", "symbol": "$", "code": "USD" }];

const fetchCurrencyList = jest.fn();
const searchCurrencyList = jest.fn();

jest.mock('@/hooks/domain/currencyInfo/useCurrencyInfo', () => ({
    useCurrencyInfo: () => ({
        fetchCurrencyList: (type: string) => ({
            data: type === 'crypto' ?
                [{ id: 'BTC', name: 'Bitcoin', symbol: 'BTC' }] :
                [{ "id": "USD", "name": "United States Dollar", "symbol": "$", "code": "USD" }],
            isLoading: false,
        }),
        searchCurrencyList: (input: string, type: string) => ({
            data: type === 'crypto' ?
                [{ id: 'BTC', name: 'Bitcoin', symbol: 'BTC' }] :
                [{ "id": "USD", "name": "United States Dollar", "symbol": "$", "code": "USD" }],
            isLoading: false,
        }),
    }),
}));

describe('useCurrencyList', () => {
    beforeEach(() => {
        fetchCurrencyList.mockImplementation((type) => ({
            data: type === CURRENCY_TYPE.CRYPTO ? mockCryptoData : mockFiatData,
            isLoading: false,
        }));

        searchCurrencyList.mockImplementation((input, type) => ({
            data: type === CURRENCY_TYPE.CRYPTO ? mockCryptoData : mockFiatData,
            isLoading: false,
        }));
    });

    it('should return crypto list when isCurrencyList=true', () => {
        const { result } = renderHook(() => useCurrencyList(true, false));
        expect(result.current.dataList).toEqual(mockCryptoData);
        expect(result.current.placeholder).toBe('screen_currency_list.search_crypto');
        expect(result.current.hasData).toBe(true);
    });

    it('should return fiat list when isFiatList=true', () => {
        const { result } = renderHook(() => useCurrencyList(false, true));
        expect(result.current.dataList).toEqual(mockFiatData);
        expect(result.current.placeholder).toBe('screen_currency_list.search_fiat');
        expect(result.current.hasData).toBe(true);
    });

    it('should return combined list when isCurrencyList=true and isFiatList=true', () => {
        const { result } = renderHook(() => useCurrencyList(true, true));
        expect(result.current.dataList).toEqual([...mockCryptoData, ...mockFiatData]);
        expect(result.current.placeholder).toBe('screen_currency_list.search_all');
        expect(result.current.hasData).toBe(true);
    });

    it('should update inputText', () => {
        const { result } = renderHook(() => useCurrencyList(true, false));
        act(() => {
            result.current.setInputText('btc');
        });
        expect(result.current.inputText).toBe('btc');
    });
});
