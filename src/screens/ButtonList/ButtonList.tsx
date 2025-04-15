import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useI18n } from '@/hooks';
import { useTheme } from '@/theme';

import { SafeScreen } from '@/components/templates';
import VCBButton from '@/components/foundations/VCBButton';

function ButtonList() {
  const { t } = useTranslation();
  const { toggleLanguage } = useI18n();

  const {
    changeTheme,
    layout,
    variant,
  } = useTheme();

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
        <VCBButton buttonSize='large' buttonType='solid' languageKey='Clear the data' containerStyle={styles.buttonStyle} />
        <VCBButton buttonSize='large' buttonType='solid' languageKey='Insert the data' containerStyle={styles.buttonStyle} />
        <VCBButton buttonSize='large' buttonType='solid' languageKey='Currency List A - Crypto' containerStyle={styles.buttonStyle} />
        <VCBButton buttonSize='large' buttonType='solid' languageKey='Currency List B - Crypto' containerStyle={styles.buttonStyle} />
        <VCBButton buttonSize='large' buttonType='solid' languageKey='Currency List A + B' containerStyle={styles.buttonStyle} />
      </View>
    </SafeScreen>
  );
}

const styles = {
  buttonStyle: {
    width: 300,
    marginBottom: 10,
  },
};

export default ButtonList;
