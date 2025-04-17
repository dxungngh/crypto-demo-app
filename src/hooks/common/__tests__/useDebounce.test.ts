import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
    it('should return the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('test'));
        expect(result.current).toBe('test');
    });

    it('should debounce value changes', () => {
        const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
            initialProps: { value: 'initial', delay: 300 },
        });

        // Update value
        rerender({ value: 'updated', delay: 300 });

        // Should still be the old value before debounce delay
        expect(result.current).toBe('initial');

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(result.current).toBe('updated');
    });

    it('should reset timeout on rapid changes', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
            initialProps: { value: 'first' },
        });

        // Rapid updates
        rerender({ value: 'second' });
        act(() => {
            jest.advanceTimersByTime(100);
        });

        rerender({ value: 'third' });
        act(() => {
            jest.advanceTimersByTime(100);
        });

        rerender({ value: 'fourth' });
        act(() => {
            jest.advanceTimersByTime(300);
        });

        expect(result.current).toBe('fourth');
    });

    it('should use default delay if not provided', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
            initialProps: { value: 'default' },
        });

        rerender({ value: 'new' });

        act(() => {
            jest.advanceTimersByTime(300); // default
        });

        expect(result.current).toBe('new');
    });
});
