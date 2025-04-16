import type { Paths } from '@/navigation/paths';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  [Paths.ButtonList]: undefined;
  [Paths.Startup]: undefined;
  [Paths.CurrencyList]: { isCurrencyList: boolean, isFiatList: boolean };
};
