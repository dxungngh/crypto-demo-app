import CustomColors from '@/components/foundations/CustomColors';
import { CustomTextHeadingSmall } from '@/components/foundations/CustomText';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface AvatarProps {
    symbol: string;
    size?: number;
}

const Avatar = ({ symbol, size = 40 }: AvatarProps) => {
    const firstLetter = symbol.charAt(0).toUpperCase();

    return (
        <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, marginRight: 16 }]}>
            <CustomTextHeadingSmall style={styles.text}>{firstLetter}</CustomTextHeadingSmall>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        backgroundColor: CustomColors.gray_80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: CustomColors.white,
    },
});

export default Avatar;
