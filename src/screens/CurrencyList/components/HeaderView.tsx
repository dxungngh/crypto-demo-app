import { Platform, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';
import CustomTextInput from '@/components/foundations/CustomTextInput';
import CustomColors from '@/components/foundations/CustomColors';

export interface HeaderViewProps {
    placeholder?: string;
    onBackPress?: () => void;
    onTextChanged: (text: string) => void;
}

function HeaderView(props: HeaderViewProps) {
    const {
        placeholder,
        onBackPress,
        onTextChanged
    } = props;
    const { layout } = useTheme();

    return (
        <View
            style={[
                layout.row,
                layout.itemsCenter,
                layout.justifyBetween,
                layout.fullWidth,
                styles.headerContainer,
            ]}
        >
            <TouchableOpacity
                onPress={onBackPress}
                style={[
                    layout.itemsCenter,
                    layout.justifyCenter,
                    layout.left0,
                    styles.backButtonContainer,
                ]}>
                <IconByVariant
                    height={24}
                    width={24}
                    path="back"
                />
            </TouchableOpacity>
            <View style={[
                layout.flex_1,
                styles.searchContainer
            ]}>
                <CustomTextInput
                    containerStyle={{ width: '100%' }}
                    placeholder={placeholder}
                    onChangeText={(input) => { onTextChanged(input) }}
                />
            </View>
        </View>
    );
}

const styles = {
    headerContainer: {
        height: 56,
        paddingTop: Platform.OS === 'ios' ? 12 : 0,
        paddingHorizontal: 12,
        backgroundColor: CustomColors.white,
    },
    backButtonContainer: {
        height: 40,
        width: 40
    },
    searchContainer: {
        marginLeft: 12
    }
};

export default HeaderView;