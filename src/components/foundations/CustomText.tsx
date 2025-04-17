import React from 'react';
import {
    Text,
    TextProps
} from 'react-native';
import { useTranslation } from 'react-i18next';
import CustomTypeface from './CustomTypeface';

export interface CustomTextProps extends TextProps {
    /**
     * Key from Language
     */
    languageKey?: string
}

const CustomTextBase = ({ children, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) => {
    const { t } = useTranslation();
    if (languageKey) {
        return (
            <Text allowFontScaling={false} {...rest}>
                {t(languageKey)}
            </Text>
        )
    }
    return (
        <Text allowFontScaling={false} {...rest}>
            {children}
        </Text>
    )
}

export function CustomTextHeadingXXLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.headingXXLarge]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextHeadingXLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.headingXLarge]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextHeadingLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.headingLarge]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextHeadingMedium({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.headingMedium]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextHeadingSmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.headingSmall]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextHeadingXSmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.headingXSmall]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextLabelLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.LabelLarge]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextLabelMedium({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.LabelMedium]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextLabelSmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.LabelSmall]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextBodyXLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.BodyXLarge]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextBodyLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.BodyLarge]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextBodyMedium({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.BodyMedium]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextBodySmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.BodySmall]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
export function CustomTextBodyXSmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<CustomTextProps>) {
    return (
        <CustomTextBase style={[style, CustomTypeface.BodyXSmall]} languageKey={languageKey} {...rest}>
            {children}
        </CustomTextBase>
    )
}
