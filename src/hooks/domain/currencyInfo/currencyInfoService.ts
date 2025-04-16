import { MMKV } from 'react-native-mmkv';
import { CurrencyInfo, CurrencyType } from '@/hooks/domain/currencyInfo/schema';

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

  mergeWithoutDuplicates(
    existing: CurrencyInfo[],
    incoming: CurrencyInfo[]
  ): CurrencyInfo[] {
    const map = new Map<string, CurrencyInfo>();

    for (const item of existing) {
      map.set(item.id, item);
    }
    // Add incoming items, replacing any existing ones with the same id
    for (const item of incoming) {
      map.set(item.id, item);
    }

    return Array.from(map.values());
  },

  /**
   * Save a list of currencies into storage.
   */
  saveCryptoList(data: CurrencyInfo[]): void {
    const existing = CurrencyInfoService.getAll();
    const deduplicated = CurrencyInfoService.mergeWithoutDuplicates(existing, data);
    storage.set(STORAGE_KEY, JSON.stringify(deduplicated));
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
