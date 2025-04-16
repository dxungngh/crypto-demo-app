import { View } from 'react-native';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import CustomButton from '@/components/foundations/CustomButton';
import CustomAlert from '@/components/foundations/CustomAlert';
import { useButtonList } from '@/hooks/buttonList/useButtonList';
import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';
import { cryptoList, fiatList } from '@/assets/data';
import HeaderView from './components/HeaderView';

function ButtonList({ navigation }: RootScreenProps<Paths.ButtonList>) {
  const { layout } = useTheme();

  const {
    isAlertVisible,
    alertTitle,
    alertContent,
    closeAlert,
    clearData,
    saveAllData,
    handleNavigateToCryptoList,
    handleNavigateToFiatList
  } = useButtonList(navigation);

  // Handlers
  const handleClear = () => clearData();
  const handleInsert = () => saveAllData(cryptoList, fiatList);
  const handleShowAll = () => console.log('Show all A + B');

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyStart,
        ]}
      >
        <HeaderView />
        <View
          style={[
            layout.col,
            layout.itemsCenter,
            layout.justifyCenter,
            layout.flex_1
          ]}
        >
          <CustomButton
            buttonSize="large"
            buttonType="solid"
            languageKey="screen_button_list.clear_data"
            onPress={handleClear}
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
            onPress={handleNavigateToCryptoList}
            containerStyle={styles.button}
          />
          <CustomButton
            buttonSize="large"
            buttonType="solid"
            languageKey="screen_button_list.list_b"
            onPress={handleNavigateToFiatList}
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
        <CustomAlert
          isVisible={isAlertVisible}
          title={alertTitle}
          content={alertContent}
          onClose={closeAlert}
        />
      </View>
    </SafeScreen>
  );
}

const styles = {
  button: {
    width: 300,
    marginBottom: 16,
  },
};

export default ButtonList;
