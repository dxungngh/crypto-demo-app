import { View } from 'react-native';
import { useTheme } from '@/theme';
import type { RootScreenProps } from '@/navigation/types';
import { Paths } from '@/navigation/paths';
import { SafeScreen } from '@/components/templates';
import { useCurrencyList } from '@/hooks/currencyList';
import HeaderView from './components/HeaderView';
import CustomColors from '@/components/foundations/CustomColors';
import NoDataView from './components/NoDataView';
import DataListView from './components/DataListView';

function CurrencyList({ navigation, route }: RootScreenProps<Paths.CurrencyList>) {
  const { isCurrencyList = false, isFiatList = false } = route.params;
  const { layout } = useTheme();

  const {
    dataList,
    placeholder,
    setInputText
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
        <HeaderView
          placeholder={placeholder}
          onBackPress={onBackPress}
          onTextChanged={(text) => { setInputText(text) }}
        />
        {dataList && Array.isArray(dataList) && dataList.length > 0 ? (
          <DataListView dataList={dataList} />
        ) : (
          <NoDataView />
        )}
      </View>
    </SafeScreen >
  );
}

export default CurrencyList;
