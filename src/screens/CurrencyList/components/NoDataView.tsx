import { IconByVariant } from '@/components/atoms';
import { CustomTextHeadingMedium } from '@/components/foundations/CustomText';
import { useTheme } from '@/theme';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const NoDataView = () => {
    const { layout } = useTheme();

    return (
        <View
            style={[
                layout.flex_1,
                layout.col,
                layout.itemsCenter,
                layout.justifyStart,
                layout.fullWidth,
                styles.bodyContainer
            ]}
        >
            <IconByVariant
                height={100}
                path="empty"
                width={100}
            />
            <CustomTextHeadingMedium
                style={styles.text}
                languageKey='screen_currency_list.no_data'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bodyContainer: {
        paddingTop: 48
    },
    text: {
        textAlign: 'center',
        marginTop: 16
    },
});

export default NoDataView;
