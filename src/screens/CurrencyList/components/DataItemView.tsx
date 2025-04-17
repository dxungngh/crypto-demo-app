import { IconByVariant } from "@/components/atoms";
import CustomColors from "@/components/foundations/CustomColors";
import { CustomTextBodyLarge } from "@/components/foundations/CustomText";
import { CurrencyInfo } from "@/hooks/domain/currencyInfo/schema";
import { useTheme } from "@/theme";
import { StyleSheet, View } from "react-native";
import Avatar from "./Avatar";

interface DataItemProps {
    item: CurrencyInfo;
}

const DataItemView = ({ item }: DataItemProps) => {
    const { layout } = useTheme();

    // const truncateName = (name: string, max = 20) => (name.length > max) ? `${name.slice(0, max)}...` : name;

    return (
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
                { flex: 1 }
            ]}>
                <Avatar symbol={item.symbol} />
                <CustomTextBodyLarge numberOfLines={1}>
                    {/* {truncateName(item.name)} */}
                    {item.name}
                </CustomTextBodyLarge>
            </View>
            <View style={[
                layout.row,
                layout.itemsCenter,
                layout.justifyBetween,
                { flexShrink: 0, marginLeft: 8 }
            ]}>
                <CustomTextBodyLarge style={styles.symbol}>
                    {item.symbol}
                </CustomTextBodyLarge>
                <IconByVariant
                    height={24}
                    width={24}
                    path="chevron_right"
                />
            </View>
        </View>
    );
}

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

export default DataItemView;