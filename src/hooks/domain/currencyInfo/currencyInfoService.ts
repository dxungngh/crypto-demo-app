import { MMKV } from 'react-native-mmkv';
import { CurrencyInfo, CurrencyType } from '@/domain/currency/schema';

const storage = new MMKV();
const STORAGE_KEY = 'currencyList';

/**
 * CurrencyInfoService is responsible for managing currency data
 * in local storage using MMKV.
 */
export const CurrencyInfoService = {
  /**
   * Get the full list of currencies from storage.
   */
  getAll(): CurrencyInfo[] {
    const raw = storage.getString(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  /**
   * Get a filtered list of currencies by type ('crypto' or 'fiat').
   */
  getByType(type: CurrencyType): CurrencyInfo[] {
    const all = CurrencyInfoService.getAll();
    return all.filter((item) => item.type === type);
  },

  /**
   * Get currencies that are available to buy.
   */
  getAvailableToBuy(): CurrencyInfo[] {
    const all = CurrencyInfoService.getAll();
    return all.filter((item) => item.isAvailableToBuy);
  },

  /**
   * Save a list of currencies into storage.
   */
  saveAll(data: CurrencyInfo[]): void {
    storage.set(STORAGE_KEY, JSON.stringify(data));
  },

  /**
   * Clear all currency data from storage.
   */
  clearAll(): void {
    storage.delete(STORAGE_KEY);
  },

  /**
   * Search currencies by keyword.
   * Match rules:
   * - Name starts with query (case-insensitive)
   * - OR name contains ' query' (space + query)
   * - OR symbol starts with query
   */
  search(query: string): CurrencyInfo[] {
    const all = CurrencyInfoService.getAll();
    const lowerQuery = query.toLowerCase();

    return all.filter((item) => {
      const name = item.name.toLowerCase();
      const symbol = item.symbol.toLowerCase();
      return (
        name.startsWith(lowerQuery) ||
        name.includes(' ' + lowerQuery) ||
        symbol.startsWith(lowerQuery)
      );
    });
  },
};
