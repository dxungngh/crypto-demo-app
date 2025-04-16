import type { RootScreenProps } from '@/navigation/types';
import { useEffect } from 'react';
import { Paths } from '@/navigation/paths';
import { SafeScreen } from '@/components/templates';
import { CustomTextBodyLarge } from '@/components/foundations/CustomText';

function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.ButtonList }],
    });
  }, []);

  return (
    <SafeScreen>
      <CustomTextBodyLarge languageKey='startup.welcome' />
    </SafeScreen>
  );
}

export default Startup;
