import CustomColors from '@/components/foundations/CustomColors';
import { CustomTextBodyLarge } from '@/components/foundations/CustomText';
import { CurrencyInfo } from '@/hooks/domain/currencyInfo/schema';
import { useTheme } from '@/theme';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Avatar from './Avatar';
import { IconByVariant } from '@/components/atoms';

interface DataListProps {
    dataList: CurrencyInfo[];
}

const DataListView = ({ dataList }: DataListProps) => {
    const { layout } = useTheme();

    const renderItem = ({ item }: { item: CurrencyInfo }) => (
        <View style={[
            layout.row,
            layout.itemsCenter,
            layout.justifyBetween,
            layout.fullWidth,
            styles.item
        ]}>
            <View style={[
                layout.row,
                layout.itemsCenter,
                layout.justifyStart,
                { width: '80%' }
            ]}>
                <Avatar symbol={item.symbol} />
                <CustomTextBodyLarge>{`${item.name}`}</CustomTextBodyLarge>
            </View>
            <View style={[
                layout.row,
                layout.itemsCenter,
                layout.justifyBetween,
                { width: '20%' }
            ]}>
                <CustomTextBodyLarge style={styles.symbol}>{`${item.symbol}`}</CustomTextBodyLarge>
                <IconByVariant
                    height={24}
                    width={24}
                    path="chevron_right"
                />
            </View>
        </View>
    );

    return (
        <View style={[
            layout.col,
            layout.itemsStart,
            layout.justifyStart,
            layout.fullWidth,
        ]}>
            <FlatList
                data={dataList}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 8,
        borderBottomColor: CustomColors.gray_10,
        borderBottomWidth: 1
    },
    symbol: {
        color: CustomColors.gray_80,
    }
});

export default DataListView;
