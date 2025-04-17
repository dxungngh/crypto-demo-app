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
            />
        </View>
    );
};

export default DataListView;
