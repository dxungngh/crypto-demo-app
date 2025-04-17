import CustomButton from "@/components/foundations/CustomButton";
import { useI18n } from "@/hooks";
import { useTheme } from "@/theme";
import { Platform, View } from "react-native";

function HeaderView() {
    const { layout } = useTheme();
    const { toggleLanguage } = useI18n();

    return (
        <View style={[
            layout.row,
            layout.justifyEnd,
            layout.fullWidth,
            layout.itemsCenter,
            styles.headerView
        ]}>
            <CustomButton
                buttonSize="small"
                buttonType="secondary"
                languageKey="screen_button_list.language"
                onPress={toggleLanguage}
                containerStyle={styles.languageButton}
            />
        </View>
    );
}

const styles = {
    headerView: {
        height: 56,
        paddingTop: Platform.OS === 'ios' ? 12 : 0,
        paddingHorizontal: 12,
    },
    languageButton: {
        width: 140
    }
};

export default HeaderView;