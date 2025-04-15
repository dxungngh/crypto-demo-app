import React, { JSX } from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle,
    Pressable,
    TextProps
} from 'react-native';
import { CustomTextHeadingSmall, CustomTextLabelLarge, CustomTextLabelMedium } from './CustomText';
import CustomColors from './CustomColors';

export type CustomButtonProps = {
    /**
     * children button
     * children is skipped when languageKey is not null
     */
    children?: JSX.Element | JSX.Element[] | string;
    /**
     * Key from LanguageOptions
     */
    languageKey?: string;
    /**
     * 
     * @returns callback
     */
    onPress?: () => void;
    /**
     * button state
     */
    disabled?: boolean;
    /**
     * Custom text style
     */
    textStyles?: StyleProp<TextStyle>;
    /**
     * enum('large', 'medium', 'small')
     * default: large
     */
    buttonSize?: 'large' | 'medium' | 'small',
    /**
     * enum('solid' | 'secondary' | 'tertiary' | 'link')
     */
    buttonType?: 'solid' | 'secondary' | 'tertiary' | 'link';
    /**
     * enum('prefix', 'suffix', 'only')
     */
    iconType?: 'prefix' | 'suffix' | 'only';
    /**
     * Icon widget
     */
    iconChildren?: JSX.Element,
    /**
     * Custom container style
     */
    containerStyle?: StyleProp<ViewStyle>;
};

export interface CustomTextButtonProps extends TextProps {
    /**
     * Key from LanguageOptions
     */
    languageKey?: string,
    /**
     * enum('large', 'medium', 'small')
     * default: large
     */
    buttonSize: String
}

export default function CustomButton({
    children,
    onPress,
    disabled,
    textStyles,
    buttonType = 'solid',
    iconType = 'prefix',
    buttonSize = 'large',
    iconChildren,
    containerStyle,
    languageKey
}: CustomButtonProps) {
    return (
        <Pressable
            accessibilityRole="button"
            style={containerStyle}
            onPress={onPress}
            disabled={disabled}
        >
            {({ pressed }) => (
                <ButtonBackground
                    style={[
                        Styles.container,
                        {
                            height: buttonSize === 'large' ? 64 : buttonSize === 'medium' ? 48 : 32,
                            borderRadius: buttonSize === 'large' ? 12 : buttonSize === 'medium' ? 8 : 6
                        }
                    ]}
                    pressed={pressed}
                    isDisable={disabled}
                    type={buttonType}>
                    <>
                        {iconType === 'prefix' && iconChildren}
                        {iconType === 'prefix' && <View style={{ width: 8 }} />}

                        {iconType === 'only' ? iconChildren : typeof children === 'string' || languageKey ? (
                            <TextButton buttonSize={buttonSize}
                                style={[textStyles, { color: textColor(buttonType, disabled) }]}
                                languageKey={languageKey}
                            >
                                {children}
                            </TextButton>
                        ) : (
                            children
                        )}
                        {iconType === 'suffix' && <View style={{ width: 8 }} />}
                        {iconType === 'suffix' && iconChildren}
                    </>
                </ButtonBackground>
            )}

        </Pressable>
    );
}

function ButtonBackground({
    children,
    style,
    pressed,
    type,
    isDisable,
}: {
    children: JSX.Element;
    style: StyleProp<ViewStyle>;
    pressed?: boolean,
    type?: String;
    isDisable?: boolean;
}) {
    switch (type) {
        case 'solid':
            return (
                <View style={[style, isDisable ? Styles.container_solid_disable : pressed ? Styles.container_solid_enable_press : Styles.container_solid_enable]}>{children}</View>
            );
        case 'secondary':
            return (
                <View style={[style, isDisable ? Styles.container_secondary_disable : pressed ? Styles.container_secondary_enable_press : Styles.container_secondary_enable]}>{children}</View>
            );
        case 'tertiary':
            return (
                <View style={[style, isDisable ? Styles.container_tertiary_disable : pressed ? Styles.container_tertiary_enable_pressed : Styles.container_tertiary_enable]}>{children}</View>
            );
        case 'link':
            return (
                <View style={[style, pressed ? Styles.container_link_pressed : {}]}>{children}</View>
            );

        default:
            return <View style={style}>{children}</View>;
    }
}

function TextButton({ children, buttonSize, languageKey, ...rest }: React.PropsWithChildren<CustomTextButtonProps>) {

    switch (buttonSize) {
        case 'medium':
            return (
                <CustomTextLabelLarge languageKey={languageKey} {...rest} >
                    {children}
                </CustomTextLabelLarge>
            )
        case 'small':
            return (
                <CustomTextLabelMedium languageKey={languageKey} {...rest}>
                    {children}
                </CustomTextLabelMedium>
            )
        default:
            // Default button size = large
            return (
                <CustomTextHeadingSmall languageKey={languageKey} {...rest}>
                    {children}
                </CustomTextHeadingSmall>
            )
    }
}

function textColor(type?: String, isDisable?: boolean) {
    switch (type) {
        case 'gradient':
        case 'solid':
            return CustomColors.white;
        case 'secondary':
        case 'link':
            return !isDisable ? CustomColors.green_90 : CustomColors.gray_50;
        case 'tertiary':
            return !isDisable ? CustomColors.gray_100 : CustomColors.gray_50;
        default:
            return CustomColors.green_90;
    }
}

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        paddingHorizontal: 24,
    },
    container_solid_enable: {
        borderWidth: 0,
        backgroundColor: CustomColors.green_90
    },
    container_solid_enable_press: {
        borderWidth: 0,
        backgroundColor: '#005A32'
    },
    container_solid_disable: {
        borderWidth: 0,
        backgroundColor: CustomColors.gray_50,
    },
    container_secondary_enable: {
        borderWidth: 1,
        borderColor: CustomColors.green_90,
        backgroundColor: CustomColors.white
    },
    container_secondary_enable_press: {
        borderWidth: 1,
        borderColor: CustomColors.green_90,
        backgroundColor: CustomColors.green_10
    },
    container_secondary_disable: {
        borderWidth: 1,
        borderColor: CustomColors.gray_40,
        backgroundColor: CustomColors.white,
    },
    container_tertiary_enable: {
        borderWidth: 1,
        borderColor: CustomColors.gray_40,
        backgroundColor: CustomColors.white
    },
    container_tertiary_enable_pressed: {
        borderWidth: 1,
        borderColor: CustomColors.gray_40,
        backgroundColor: CustomColors.gray_20
    },
    container_tertiary_disable: {
        borderWidth: 1,
        borderColor: CustomColors.gray_40,
        backgroundColor: CustomColors.white,
    },
    container_link_pressed: {
        backgroundColor: CustomColors.green_10
    },
});
