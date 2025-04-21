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
import { CustomTextBodyMedium, CustomTextLabelLarge } from './CustomText';
import { IconByVariant } from '../atoms';
import { useTranslation } from 'react-i18next';
import CustomColors from './CustomColors';
import CustomTypeface from './CustomTypeface';

export interface CustomTextInputProps extends TextInputProps {
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

export default function CustomTextInput({
  editable = true,
  isShowClearIcon = true,
  isShowChecked = false,
  placeholderLanguageKey,
  ...props
}: CustomTextInputProps) {
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
    if (props.errorMsg || props.errorMsgLanguageKey) return CustomColors.red_60;
    if (isFocus) {
      return CustomColors.green_90;
    }
    return CustomColors.gray_40;
  }, [isFocus, props.errorMsg, props.errorMsgLanguageKey]);

  return (
    <View style={[props.containerStyle, Styles.container]}>
      {(props.label || props.labelLanguageKey) && (
        <CustomTextLabelLarge languageKey={props.labelLanguageKey} style={{ marginBottom: 6 }}>
          {props.label}
        </CustomTextLabelLarge>
      )}
      <View
        style={[
          Styles.input_container,
          {
            borderColor: getBorderColor(),
            backgroundColor: !editable ? CustomColors.gray_20 : CustomColors.white,
          },
        ]}
      >
        {props.leftChild}

        <TextInput
          ref={refTextInput}
          allowFontScaling={false}
          {...props}
          style={[props.inputTextStyle, CustomTypeface.BodyLarge, Styles.text_input]}
          placeholder={
            placeholderLanguageKey
              ? t(placeholderLanguageKey)
              : props.placeholder
          }
          placeholderTextColor={CustomColors.gray_60}
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
                stroke={CustomColors.gray_100}
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
        <CustomTextBodyMedium languageKey={props.errorMsgLanguageKey} style={Styles.error_text}>
          {props.errorMsg}
        </CustomTextBodyMedium>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {},
  input_container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0
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
    color: CustomColors.red_60,
  },
  text_input: {
    padding: 0,
    flex: 1,
    paddingTop: 12,
    marginLeft: 16,
    paddingBottom: 12,
    alignSelf: 'center',
  },
});
