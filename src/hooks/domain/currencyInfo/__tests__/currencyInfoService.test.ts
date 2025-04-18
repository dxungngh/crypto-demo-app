import { CurrencyInfoService } from '../currencyInfoService';
import { CurrencyInfo } from '../schema';

jest.mock('react-native-mmkv', () => {
    const store = new Map<string, string>();
    return {
        MMKV: jest.fn().mockImplementation(() => ({
            getString: (key: string) => store.get(key) ?? null,
            set: (key: string, value: string) => store.set(key, value),
            delete: (key: string) => store.delete(key),
        })),
    };
});

const mockData: CurrencyInfo[] = [
    { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', code: '', type: 'crypto' },
    { id: 'ETH', name: 'Ethereum', symbol: 'ETH', code: '', type: 'crypto' },
    { id: 'USD', name: 'US Dollar', symbol: '$', code: 'USD', type: 'fiat' },
];

describe('CurrencyInfoService', () => {
    beforeEach(() => {
        CurrencyInfoService.clearAll();
    });

    it('should return empty list when storage is empty', () => {
        const result = CurrencyInfoService.getAll();
        expect(result).toEqual([]);
    });

    it('should save and retrieve currency list', () => {
        CurrencyInfoService.saveCryptoList([mockData[0]]);
        const result = CurrencyInfoService.getAll();
        expect(result).toEqual([mockData[0]]);
    });

    it('should filter by type', () => {
        CurrencyInfoService.saveCryptoList([mockData[0], mockData[2]]);
        const crypto = CurrencyInfoService.getByType('crypto');
        const fiat = CurrencyInfoService.getByType('fiat');

        expect(crypto).toEqual([mockData[0]]);
        expect(fiat).toEqual([mockData[2]]);
    });

    it('should merge without duplicates', () => {
        const merged = CurrencyInfoService.mergeWithoutDuplicates(
            [mockData[0]],
            [{ ...mockData[0], name: 'Bitcoin (Updated)' }]
        );
        expect(merged).toHaveLength(1);
        expect(merged[0].name).toBe('Bitcoin (Updated)');
    });

    it('should clear all data', () => {
        CurrencyInfoService.saveCryptoList([mockData[0]]);
        CurrencyInfoService.clearAll();
        const result = CurrencyInfoService.getAll();
        expect(result).toEqual([]);
    });
});
