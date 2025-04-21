import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { CustomTextBodyLarge, CustomTextHeadingMedium, CustomTextLabelLarge } from './CustomText';
import CustomColors from './CustomColors';
import CustomButton from './CustomButton';

interface ModalProps {
    isVisible?: boolean;
    isShowWarningIcon?: boolean;
    title?: string;
    content?: string;
    confirmText?: string;
    htmlContent?: string;
    customView?: React.ReactNode | undefined;
    onClose?: () => void;
}

function renderHtmlText(content: string) {
    const regex = new RegExp('<b>(.*?)</b>', '');
    return (
        <CustomTextBodyLarge style={{ textAlign: 'center', marginTop: 16 }}>
            {`${content}`.split(regex).map((text, i) => {
                if (content.includes(`<b>${text}</b>`)) {
                    return <CustomTextLabelLarge key={i}>{text}</CustomTextLabelLarge>;
                }
                return [text];
            })}
        </CustomTextBodyLarge>
    );
}

export interface CustomAlertRef {
    setVisible?: (modalOption: ModalProps) => void;
}

const CustomAlert = forwardRef(
    (
        {
            isVisible,
            onClose,
            title,
            content,
            htmlContent,
            confirmText = 'OK',
            customView,
        }: ModalProps,
        currentRef?: React.ForwardedRef<CustomAlertRef>
    ) => {
        const [isVisibleState, setIsVisibleState] = useState(isVisible);
        const [titleState, setTitleState] = useState(title);
        const [contentState, setContentState] = useState(content);
        const [htmlContentState, setHtmlContentState] = useState(htmlContent);
        const confirmFunc = useRef<(() => void) | null>(null);

        useEffect(() => {
            if (isVisible !== isVisibleState) {
                setIsVisibleState(isVisible);
                setTitleState(title);
                setContentState(content);
                setHtmlContentState(htmlContent);
            }
        }, [isVisible]);

        const setVisible = (modalOption: ModalProps) => {
            setIsVisibleState(modalOption.isVisible);
            setTitleState(modalOption.title);
            setContentState(modalOption.content);
            setHtmlContentState(modalOption.htmlContent);
            confirmFunc.current = modalOption.onClose ?? null;
        };

        useImperativeHandle(currentRef, () => ({
            setVisible: setVisible,
        }));

        if (!isVisibleState) return null;
        return (
            <Modal
                visible={isVisibleState}
                transparent
                animationType="fade">
                <View style={Styles.modalContainer}>
                    <View style={Styles.dialogContainer}>
                        {customView}
                        {titleState && (
                            <CustomTextHeadingMedium style={{ color: CustomColors.gray_100, textAlign: 'center' }}>
                                {titleState}
                            </CustomTextHeadingMedium>
                        )}
                        {htmlContentState && renderHtmlText(htmlContentState)}
                        <CustomTextBodyLarge
                            style={{ color: CustomColors.gray_100, textAlign: 'center', marginVertical: 16 }}
                        >
                            {contentState}
                        </CustomTextBodyLarge>
                        <CustomButton
                            buttonSize="medium"
                            buttonType="solid"
                            children={confirmText} // Confirm
                            onPress={() => {
                                if (confirmFunc.current) confirmFunc.current();
                                if (onClose) onClose();
                                setIsVisibleState(false);
                            }}
                            containerStyle={{ width: '100%' }}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
);

const Styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
    },
    dialogContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 24,
        backgroundColor: 'white',
        width: '70%',
        borderRadius: 12,
    },
});

export default CustomAlert;
