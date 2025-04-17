import { useEffect, useState } from 'react';

/**
 * Debounce hook that delays the value update until after delay milliseconds.
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 300)
 */
export function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}
