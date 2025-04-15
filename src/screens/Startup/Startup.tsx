import type { RootScreenProps } from '@/navigation/types';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';
import VCBButton from '@/components/foundations/VCBButton';

function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation();

  const { isError, isFetching, isSuccess } = useQuery({
    queryFn: () => {
      return Promise.resolve(true);
    },
    queryKey: ['startup'],
  });

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.ButtonList }],
      });
    }
  }, [isSuccess, navigation]);

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
        <VCBButton buttonSize='large' languageKey='Clear the data' />
        <VCBButton buttonSize='large' languageKey='Insert the data' />
        <VCBButton buttonSize='large' languageKey='Currency List A - Crypto' />
        <VCBButton buttonSize='large' languageKey='Currency List B - Crypto' />
        <VCBButton buttonSize='large' languageKey='Currency List A + B' />
      </View>
    </SafeScreen>
  );
}

export default Startup;
