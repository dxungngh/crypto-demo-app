import React from 'react';
import {
    Text,
    TextProps
} from 'react-native';
import { useTranslation } from 'react-i18next';
import VCBTypeface from './VCBTypeface';

export interface VCBTextProps extends TextProps {
    /**
     * Key from LanguageOptions
     */
    languageKey?: string
}

const VCBTextBase = ({ children, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) => {
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

export function VCBTextHeadingXXLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.headingXXLarge]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextHeadingXLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.headingXLarge]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextHeadingLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.headingLarge]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextHeadingMedium({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.headingMedium]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextHeadingSmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.headingSmall]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextHeadingXSmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.headingXSmall]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextLabelLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.LabelLarge]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextLabelMedium({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.LabelMedium]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextLabelSmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.LabelSmall]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextBodyXLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.BodyXLarge]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextBodyLarge({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.BodyLarge]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextBodyMedium({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.BodyMedium]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextBodySmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.BodySmall]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
export function VCBTextBodyXSmall({ children, style, languageKey, ...rest }: React.PropsWithChildren<VCBTextProps>) {
    return (
        <VCBTextBase style={[style, VCBTypeface.BodyXSmall]} languageKey={languageKey} {...rest}>
            {children}
        </VCBTextBase>
    )
}
