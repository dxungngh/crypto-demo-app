import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { useI18n } from '@/hooks';
import { useTheme } from '@/theme';
import { useCurrencyInfo } from '@/hooks/useCurrencyInfo';

import { SafeScreen } from '@/components/templates';
import CustomButton from '@/components/foundations/CustomButton';

function ButtonList() {
  const { t } = useTranslation('cryptodemoapp');
  const { toggleLanguage } = useI18n();
  const { changeTheme, layout } = useTheme();

  const {
    saveMutation,
    clearMutation,
    useCurrencyList,
  } = useCurrencyInfo();

  const sampleData = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', type: 'crypto', isAvailableToBuy: true },
    { id: 2, name: 'Ethereum', symbol: 'ETH', type: 'crypto', isAvailableToBuy: false },
    { id: 3, name: 'USD', symbol: 'USD', type: 'fiat', isAvailableToBuy: true },
    { id: 4, name: 'VND', symbol: 'VND', type: 'fiat', isAvailableToBuy: false },
  ];

  const { mutate: clearData, isLoading, isSuccess, isError } = clearMutation;

  // Handlers
  const handleClear = () => clearData();
  const handleInsert = () => saveMutation.mutate(sampleData);
  const handleSwitchToCrypto = () => console.log('Switch to crypto list');
  const handleSwitchToFiat = () => console.log('Switch to fiat list');
  const handleShowAll = () => console.log('Show all A + B');

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <CustomButton
          buttonSize="large"
          buttonType="solid"
          languageKey={
            isLoading
              ? 'screen_button_list.clearing'
              : 'screen_button_list.clear_data'
          }
          onPress={handleClear}
          isDisabled={isLoading}
          containerStyle={styles.button}
        />
        <CustomButton
          buttonSize="large"
          buttonType="solid"
          languageKey="screen_button_list.insert_data"
          onPress={handleInsert}
          containerStyle={styles.button}
        />
        <CustomButton
          buttonSize="large"
          buttonType="solid"
          languageKey="screen_button_list.list_a"
          onPress={handleSwitchToCrypto}
          containerStyle={styles.button}
        />
        <CustomButton
          buttonSize="large"
          buttonType="solid"
          languageKey="screen_button_list.list_b"
          onPress={handleSwitchToFiat}
          containerStyle={styles.button}
        />
        <CustomButton
          buttonSize="large"
          buttonType="solid"
          languageKey="screen_button_list.list_all"
          onPress={handleShowAll}
          containerStyle={styles.button}
        />
      </View>
    </SafeScreen>
  );
}

const styles = {
  button: {
    width: 300,
    marginBottom: 10,
  },
};

export default ButtonList;
