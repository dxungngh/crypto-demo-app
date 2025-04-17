import { renderHook, act } from '@testing-library/react-hooks';
import { useButtonList } from '../useButtonList';
import { Paths } from '@/navigation/paths';
import { useCurrencyInfo } from '@/hooks/domain/currencyInfo/useCurrencyInfo';

// Mock navigation
const mockNavigate = jest.fn();
const mockNavigation = {
    navigate: mockNavigate,
} as any;

// Mock useCurrencyInfo
jest.mock('@/hooks/domain/currencyInfo/useCurrencyInfo', () => ({
    useCurrencyInfo: jest.fn(),
}));

const mockUseCurrencyInfo = useCurrencyInfo as jest.Mock;

describe('useButtonList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should show alert on save success', () => {
        mockUseCurrencyInfo.mockReturnValue({
            clearData: jest.fn(),
            clearStatus: 'idle',
            saveAllData: jest.fn(),
            saveStatus: 'success',
            resetClearStatus: jest.fn(),
            resetSaveStatus: jest.fn(),
        });

        const { result } = renderHook(() => useButtonList(mockNavigation));

        expect(result.current.isAlertVisible).toBe(true);
        expect(result.current.alertTitle).toBeTruthy();
        expect(result.current.alertContent).toContain('insert');
    });

    it('should navigate to crypto list', () => {
        mockUseCurrencyInfo.mockReturnValue({
            clearData: jest.fn(),
            clearStatus: 'idle',
            saveAllData: jest.fn(),
            saveStatus: 'idle',
            resetClearStatus: jest.fn(),
            resetSaveStatus: jest.fn(),
        });

        const { result } = renderHook(() => useButtonList(mockNavigation));

        act(() => {
            result.current.handleNavigateToCryptoList();
        });

        expect(mockNavigate).toHaveBeenCalledWith(Paths.CurrencyList, {
            isCurrencyList: true,
            isFiatList: false,
        });
    });
});
