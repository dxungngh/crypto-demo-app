import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { CurrencyInfoService } from '@/services/currencyInfoService';
import { CurrencyInfo, CurrencyType } from '@/domain/currency/schema';

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
   * Fetch currencies that are available to buy.
   */
  const useAvailableToBuy = () =>
    useQuery<CurrencyInfo[]>({
      queryKey: [...currencyListQueryKey, 'available'],
      queryFn: () => Promise.resolve(CurrencyInfoService.getAvailableToBuy()),
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
  const saveMutation = useMutation({
    mutationFn: (data: CurrencyInfo[]) => CurrencyInfoService.saveAll(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyListQueryKey });
    },
  });

  /**
   * Clear all currencies from storage.
   */
  const clearMutation = useMutation({
    mutationFn: () => CurrencyInfoService.clearAll(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currencyListQueryKey });
    },
  });

  return {
    useCurrencyList,
    useAvailableToBuy,
    useSearch,
    saveMutation,
    clearMutation,
  };
};
