import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import { IconByVariant } from '@/components/atoms';
import CustomTextInput from '@/components/foundations/CustomTextInput';

export interface HeaderViewProps {
    placeholder?: string;
    onBackPress?: () => void;
}

function HeaderView(props: HeaderViewProps) {
    const {
        placeholder,
        onBackPress
    } = props;
    const { layout } = useTheme();

    return (
        <View
            style={[
                layout.row,
                layout.itemsCenter,
                layout.justifyBetween,
                layout.fullWidth,
                { height: 48, borderWidth: 0 }
            ]}
        >
            <TouchableOpacity
                onPress={onBackPress}
                style={[
                    layout.itemsCenter,
                    layout.justifyCenter,
                    layout.left0,
                    { height: 48, width: '10%' }
                ]}>
                <IconByVariant
                    height={24}
                    path="back"
                    width={24}
                />
            </TouchableOpacity>
            <CustomTextInput
                containerStyle={{ width: '90%' }}
                placeholder={placeholder}
            />
        </View>
    );
}

export default HeaderView;