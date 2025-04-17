export const CURRENCY_TYPE = {
    CRYPTO: 'crypto',
    FIAT: 'fiat',
} as const;

export type CurrencyType = typeof CURRENCY_TYPE[keyof typeof CURRENCY_TYPE];
