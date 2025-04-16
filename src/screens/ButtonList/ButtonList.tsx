import { View } from 'react-native';
import { useTheme } from '@/theme';
import { SafeScreen } from '@/components/templates';
import CustomButton from '@/components/foundations/CustomButton';
import CustomAlert from '@/components/foundations/CustomAlert';
import { useButtonList } from '@/hooks/buttonList/useButtonList';
import { Paths } from '@/navigation/paths';
import { RootScreenProps } from '@/navigation/types';

function ButtonList({ navigation }: RootScreenProps<Paths.ButtonList>) {
  const { layout } = useTheme();

  const {
    isAlertVisible,
    alertTitle,
    alertContent,
    closeAlert,
    clearData,
    saveAllData
  } = useButtonList();

  const listA = [
    {
      "id": "BTC",
      "name": "Bitcoin",
      "symbol": "BTC"
    },
    {
      "id": "ETH",
      "name": "Ethereum",
      "symbol": "ETH"
    },
    {
      "id": "XRP",
      "name": "XRP",
      "symbol": "XRP"
    },
    {
      "id": "BCH",
      "name": "Bitcoin Cash",
      "symbol": "BCH"
    },
    {
      "id": "LTC",
      "name": "Litecoin",
      "symbol": "LTC"
    },
    {
      "id": "EOS",
      "name": "EOS",
      "symbol": "EOS"
    },
    {
      "id": "BNB",
      "name": "Binance Coin",
      "symbol": "BNB"
    },
    {
      "id": "LINK",
      "name": "Chainlink",
      "symbol": "LINK"
    },
    {
      "id": "NEO",
      "name": "NEO",
      "symbol": "NEO"
    },
    {
      "id": "ETC",
      "name": "Ethereum Classic",
      "symbol": "ETC"
    },
    {
      "id": "ONT",
      "name": "Ontology",
      "symbol": "ONT"
    },
    {
      "id": "CRO",
      "name": "Crypto.com Chain",
      "symbol": "CRO"
    },
    {
      "id": "CUC",
      "name": "Cucumber",
      "symbol": "CUC"
    },
    {
      "id": "USDC",
      "name": "USD Coin",
      "symbol": "USDC"
    }
  ];

  const listB = [
    {
      "id": "SGD",
      "name": "Singapore Dollar",
      "symbol": "$",
      "code": "SGD"
    }, {
      "id": "EUR",
      "name": "Euro",
      "symbol": "€",
      "code": "EUR"
    }, {
      "id": "GBP",
      "name": "British Pound",
      "symbol": "£",
      "code": "GBP"
    }, {
      "id": "HKD",
      "name": "Hong Kong Dollar",
      "symbol": "$",
      "code": "HKD"
    }, {
      "id": "JPY",
      "name": "Japanese Yen",
      "symbol": "¥",
      "code": "JPY"
    }, {
      "id": "AUD",
      "name": "Australian Dollar",
      "symbol": "$",
      "code": "AUD"
    }, {
      "id": "USD",
      "name": "United States Dollar",
      "symbol": "$",
      "code": "USD"
    }
  ];

  // Handlers
  const handleClear = () => clearData();
  const handleInsert = () => saveAllData(listA, listB);
  const handleSwitchToCrypto = () => navigation.navigate(Paths.CurrencyList, { isCurrencyList: true, isFiatList: false });
  const handleSwitchToFiat = () => navigation.navigate(Paths.CurrencyList, { isCurrencyList: false, isFiatList: true });
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
          languageKey={'screen_button_list.clear_data'}
          onPress={handleClear}
          containerStyle={styles.button}
        />
        <CustomButton
          buttonSize="large"
          buttonType="solid"
          languageKey={"screen_button_list.insert_data"}
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
      <CustomAlert
        isVisible={isAlertVisible}
        title={alertTitle}
        content={alertContent}
        onClose={closeAlert}
      />
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
