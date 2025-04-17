import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@/theme';
import CustomColors from './CustomColors';

export default function CustomLoading() {
    const { layout } = useTheme();

    return (
        <View style={[layout.flex_1, layout.itemsCenter, layout.justifyCenter]}>
            <ActivityIndicator size="large" color={CustomColors.gray_100} />
        </View>
    );
}