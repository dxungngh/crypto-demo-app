import { View } from 'react-native';
import { useTheme } from '@/theme';
import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import { SafeScreen } from '@/components/templates';
import { CustomTextBodyLarge } from '@/components/foundations/CustomText';
import { useCurrencyList } from '@/hooks/currencyList';
import Header from './components/Header';
import CustomColors from '@/components/foundations/CustomColors';

function CurrencyList({ navigation, route }: RootScreenProps<Paths.CurrencyList>) {
  const { isCurrencyList = false, isFiatList = false } = route.params;

  const { layout } = useTheme();
  const {
    dataList,
    placeholder
  } = useCurrencyList(isCurrencyList, isFiatList);

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeScreen style={{ backgroundColor: CustomColors.white }}>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsStart,
          layout.justifyStart,
        ]}
      >
        <Header
          placeholder={placeholder}
          onBackPress={onBackPress}
        />
        {dataList && dataList.length > 0 ?
          <></>
          :
          <CustomTextBodyLarge languageKey='currencyList.noData' />}
      </View>
    </SafeScreen>
  );
}

export default CurrencyList;
