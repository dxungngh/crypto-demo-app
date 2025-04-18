import { CurrencyInfo } from '@/hooks/domain/currencyInfo/schema';
import { useTheme } from '@/theme';
import React from 'react';
import { View, FlatList } from 'react-native';
import DataItemView from './DataItemView';

interface DataListProps {
    dataList: CurrencyInfo[];
}

const DataListView = ({ dataList }: DataListProps) => {
    const { layout } = useTheme();
    // const ITEM_HEIGHT = 60;

    const renderItem = ({ item }: { item: CurrencyInfo }) => {
        return (
            <DataItemView item={item} />
        )
    };

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

            // 🚀 PERFORMANCE OPTIMIZATION BELOW:
            // Avoid runtime measuring by providing fixed height & offset
            // getItemLayout={(_, index) => ({
            //     length: ITEM_HEIGHT,
            //     offset: ITEM_HEIGHT * index,
            //     index,
            // })}
            />
        </View>
    );
};

export default DataListView;
