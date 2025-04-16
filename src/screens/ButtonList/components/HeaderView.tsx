import CustomButton from "@/components/foundations/CustomButton";
import { useI18n } from "@/hooks";
import { useTheme } from "@/theme";
import { View } from "react-native";

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
        marginRight: 16,
        marginBottom: 48,
    },
    languageButton: {
        width: 140
    }
};

export default HeaderView;