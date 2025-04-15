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
import { VCBTextHeadingSmall, VCBTextLabelLarge, VCBTextLabelMedium } from './VCBText';
import VCBColors from './VCBColors';

export type VCBButtonProps = {
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

export interface VCBTextButtonProps extends TextProps {
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

export default function VCBButton({
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
}: VCBButtonProps) {
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

function TextButton({ children, buttonSize, languageKey, ...rest }: React.PropsWithChildren<VCBTextButtonProps>) {

    switch (buttonSize) {
        case 'medium':
            return (
                <VCBTextLabelLarge languageKey={languageKey} {...rest} >
                    {children}
                </VCBTextLabelLarge>
            )
        case 'small':
            return (
                <VCBTextLabelMedium languageKey={languageKey} {...rest}>
                    {children}
                </VCBTextLabelMedium>
            )
        default:
            // Default button size = large
            return (
                <VCBTextHeadingSmall languageKey={languageKey} {...rest}>
                    {children}
                </VCBTextHeadingSmall>
            )
    }
}

function textColor(type?: String, isDisable?: boolean) {
    switch (type) {
        case 'gradient':
        case 'solid':
            return VCBColors.white;
        case 'secondary':
        case 'link':
            return !isDisable ? VCBColors.green_90 : VCBColors.gray_50;
        case 'tertiary':
            return !isDisable ? VCBColors.gray_100 : VCBColors.gray_50;
        default:
            return VCBColors.green_90;
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
        backgroundColor: VCBColors.green_90
    },
    container_solid_enable_press: {
        borderWidth: 0,
        backgroundColor: '#005A32'
    },
    container_solid_disable: {
        borderWidth: 0,
        backgroundColor: VCBColors.gray_50,
    },
    container_secondary_enable: {
        borderWidth: 1,
        borderColor: VCBColors.green_90,
        backgroundColor: VCBColors.white
    },
    container_secondary_enable_press: {
        borderWidth: 1,
        borderColor: VCBColors.green_90,
        backgroundColor: VCBColors.green_10
    },
    container_secondary_disable: {
        borderWidth: 1,
        borderColor: VCBColors.gray_40,
        backgroundColor: VCBColors.white,
    },
    container_tertiary_enable: {
        borderWidth: 1,
        borderColor: VCBColors.gray_40,
        backgroundColor: VCBColors.white
    },
    container_tertiary_enable_pressed: {
        borderWidth: 1,
        borderColor: VCBColors.gray_40,
        backgroundColor: VCBColors.gray_20
    },
    container_tertiary_disable: {
        borderWidth: 1,
        borderColor: VCBColors.gray_40,
        backgroundColor: VCBColors.white,
    },
    container_link_pressed: {
        backgroundColor: VCBColors.green_10
    },
});
