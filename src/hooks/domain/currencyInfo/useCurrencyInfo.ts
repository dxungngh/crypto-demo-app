import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { CurrencyInfoService } from '@/hooks/domain/currencyInfo/currencyInfoService';
import { RawCurrency, CurrencyInfo, CurrencyType } from '@/hooks/domain/currencyInfo/schema';

const currencyListQueryKey = ['currencyList'];

export const useCurrencyInfo = () => {
  const queryClient = useQueryClient();

  /**
   * Fetch currencies by type ('crypto' or 'fiat').
   */
  const useCurrencyList = (type: CurrencyType) =>
    useQuery<CurrencyInfo[]>({
      queryKey: [...currencyListQueryKey, type],
      queryFn: () => Promise.resolve(CurrencyInfoService.getByType(type)),
    });

  /**
   * Fetch currencies matching a search query.
   */
  const useSearch = (query: string) =>
    useQuery<CurrencyInfo[]>({
      queryKey: [...currencyListQueryKey, 'search', query],
      queryFn: () => Promise.resolve(CurrencyInfoService.search(query)),
      enabled: query.length > 0,
    });

  /**
   * Save a full list of currencies to storage.
   */
  const {
    mutate: saveData,
    status: saveStatus,
    isSuccess: isSaveSuccess,
    isError: isSaveError,
    reset: resetSaveStatus,
  } = useMutation({
    mutationFn: (data: CurrencyInfo[]) => Promise.resolve(CurrencyInfoService.saveCryptoList(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyListQueryKey });
    },
  });

  const saveAllData = (cryptoList: RawCurrency[], fiatList: RawCurrency[]) => {
    const list1: CurrencyInfo[] = cryptoList.map((item) => ({
      ...item,
      code: '',
      type: 'crypto' as const,
    }));

    const list2: CurrencyInfo[] = fiatList.map((item) => ({
      ...item,
      code: item.code ? item.code : '',
      type: 'fiat' as const,
    }));

    const allList = [...list1, ...list2];
    saveData(allList);
  }

  /**
   * Clear all currencies from storage.
   */
  const {
    mutate: clearData,
    status: clearStatus,
    isSuccess: isClearSuccess,
    isError: isClearError,
    reset: resetClearStatus,
  } = useMutation({
    mutationFn: () => Promise.resolve(CurrencyInfoService.clearAll()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyListQueryKey });
    },
  });

  return {
    useCurrencyList,
    useSearch,

    saveAllData,
    saveStatus,
    isSaveSuccess,
    isSaveError,

    clearData,
    clearStatus,
    isClearSuccess,
    isClearError,
    resetClearStatus,
    resetSaveStatus
  };
};
