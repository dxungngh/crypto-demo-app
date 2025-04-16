import { z } from 'zod';

/**
 * Enum representing the type of currency.
 * - 'crypto': Cryptocurrency (e.g. BTC, ETH)
 * - 'fiat': Fiat currency (e.g. USD, VND)
 */
export const currencyTypeSchema = z.enum(['crypto', 'fiat']);
export type CurrencyType = z.infer<typeof currencyTypeSchema>;

export type RawCurrency = {
  id: string;
  name: string;
  symbol: string;
  code?: string;
};

/**
 * Schema definition for a single currency object.
 */
export const currencyInfoSchema = z.object({
  id: z.string(),                         // Unique identifier
  name: z.string(),                       // Currency name (e.g. "Bitcoin")
  symbol: z.string(),                     // Currency symbol (e.g. "BTC")
  code: z.string(),                       // Currency code (e.g. "BTC")
  type: currencyTypeSchema,               // Type of currency: 'crypto' or 'fiat'
});

export type CurrencyInfo = z.infer<typeof currencyInfoSchema>;

/**
 * Schema for a list of currencies.
 */
export const currencyListSchema = z.array(currencyInfoSchema);
