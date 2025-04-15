import React, { JSX, useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { VCBTextBodyMedium, VCBTextLabelLarge } from './VCBText';
import { IconByVariant } from '../atoms';
import { useTranslation } from 'react-i18next';
import VCBColors from './VCBColors';
import VCBTypeface from './VCBTypeface';

export interface VCBTextInputProps extends TextInputProps {
  /**
   * Key from LanguageOptions
   */
  languageKey?: string;

  /**
   * Label value
   */
  label?: string;

  /**
   * Label value use language key
   */
  labelLanguageKey?: string;

  /**
   * Error message
   */
  errorMsg?: string;

  /**
   * Error message use language key
   */
  errorMsgLanguageKey?: string;

  /**
   * Placeholder message use language key
   */
  placeholderLanguageKey?: string;

  /**
   * If false, text is not editable. The default value is true.
   */
  editable?: boolean | undefined;

  /**
   * Callback that is called when the text input's text changes.
   * Changed text is passed as an argument to the callback handler.
   */
  onChangeText?: ((text: string) => void) | undefined;

  /**
   * Called after the element is focused.
   */
  onFocus?: (() => void) | undefined;

  /**
   * Called after the element loses focus.
   */
  onBlur?: (() => void) | undefined;

  /**
   * Custom right component
   */
  rightChild?: JSX.Element;

  /**
   * Custom left component
   */
  leftChild?: JSX.Element;

  /**
   * InputText style
   */
  inputTextStyle?: StyleProp<TextStyle>;

  /**
   * Container style
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * If false, clear button is not display. The default value is true.
   */
  isShowClearIcon?: boolean | undefined;
  /**
   * Show checked icon in right of text input
   */
  isShowChecked?: boolean | undefined;
}

export default function VCBTextInput({
  editable = true,
  isShowClearIcon = true,
  isShowChecked = false,
  placeholderLanguageKey,
  ...props
}: VCBTextInputProps) {
  const refTextInput = useRef<TextInput>(null);
  const [isFocus, setIsFocus] = useState(props.autoFocus);
  const [textValue, setTextValue] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (props.value) {
      setTextValue(props.value);
    }
  }, [props.value]);

  const onTextFocus = () => {
    setIsFocus(true);
    if (props.onFocus) {
      props.onFocus();
    }
  };

  const onTextBlur = () => {
    setIsFocus(false);
    if (props.onBlur) {
      props.onBlur();
    }
  };

  const onChangeTextValue = (text: string) => {
    setTextValue(text);
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  const onClearText = () => {
    setTextValue('');
    if (props.onChangeText) {
      props.onChangeText('');
    }
    refTextInput?.current?.clear();
  };

  const getBorderColor = useCallback(() => {
    if (props.errorMsg || props.errorMsgLanguageKey) return VCBColors.red_60;
    if (isFocus) {
      return VCBColors.green_90;
    }
    return VCBColors.gray_40;
  }, [isFocus, props.errorMsg, props.errorMsgLanguageKey]);

  return (
    <View style={[props.containerStyle, Styles.container]}>
      {(props.label || props.labelLanguageKey) && (
        <VCBTextLabelLarge languageKey={props.labelLanguageKey} style={{ marginBottom: 6 }}>
          {props.label}
        </VCBTextLabelLarge>
      )}
      <View
        style={[
          Styles.input_container,
          {
            borderColor: getBorderColor(),
            backgroundColor: !editable ? VCBColors.gray_20 : VCBColors.white,
          },
        ]}
      >
        {props.leftChild}

        <TextInput
          ref={refTextInput}
          allowFontScaling={false}
          {...props}
          style={[props.inputTextStyle, VCBTypeface.BodyLarge, Styles.text_input]}
          placeholder={
            placeholderLanguageKey
              ? t(placeholderLanguageKey)
              : props.placeholder
          }
          editable={editable}
          onFocus={onTextFocus}
          onBlur={onTextBlur}
          onChangeText={onChangeTextValue}
        />
        <View style={{ flexDirection: "row" }}>
          {isShowClearIcon && editable && textValue.length > 0 ? (
            <TouchableOpacity style={Styles.button_close} onPress={onClearText}>
              <IconByVariant
                height={24}
                path="close"
                stroke={VCBColors.gray_100}
                width={24}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ height: 24, marginVertical: 12 }} />
          )}
        </View>
        {props.rightChild}
      </View>
      {(props.errorMsg || props.errorMsgLanguageKey) && (
        <VCBTextBodyMedium languageKey={props.errorMsgLanguageKey} style={Styles.error_text}>
          {props.errorMsg}
        </VCBTextBodyMedium>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {},
  input_container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
  },
  icon_green_checked: {
    marginLeft: 8,
    marginVertical: 12
  },
  button_close: {
    paddingRight: 12,
    paddingLeft: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error_text: {
    marginTop: 6,
    color: VCBColors.red_60,
  },
  text_input: {
    padding: 0,
    flex: 1,
    lineHeight: 0,
    paddingTop: 12,
    marginLeft: 16,
    paddingBottom: 12,
    alignSelf: 'center',
  },
});
