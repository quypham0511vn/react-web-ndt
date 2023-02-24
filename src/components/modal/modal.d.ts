import { BUTTON_STYLES } from 'components/button/types';
import { ItemProps } from 'models/common';
import { ReactNode } from 'react';
export type PopupBaseProps = {
    onClose?: () => any;
    onConfirm?: () => any;
    onBackdropPress?: () => any;
    onSuccessPress?: (...params: any[]) => any;
    onCodeChanged?: () => any;
    onSuccess?: any;
    data?: any;
    dataChannel?: ItemProps[];
    content?: string;
    btnText?: string;
    description?: string;
    title?: string;
    isIcon?: boolean;
    icon?: any;
    hasTwoButton?: boolean;
    hasOneButton?: boolean;
    keyCode?: any;
    webView?: string;
    labelSuccess?: string;
    labelCancel?: string;
    iconRight?: any;
    iconLeft?: any;
    hasCloseIc?: boolean;
    titleHeader?: string;
    iconHeader?: any;
    buttonLeftStyle?: keyof typeof BUTTON_STYLES;
    buttonRightStyle?: keyof typeof BUTTON_STYLES;
    notCenter?: boolean;
    width?: string;
    imgStyle?: string;
    /// styling UI
    popupContainerStyle?: string;
    titleContainerStyle?: string;
    textTitleStyle?: string;
    describeContainerStyle?: string;
    textDescribeStyle?: string;
    buttonContainerStyle?: string;
    buttonAgreeStyle?: string;
    buttonCancelStyle?: string;
    textAgreeStyle?: string;
    textCancelStyle?: string;
    iconLeftStyle?: string;
    iconRightStyle?: string;
    customerContent?: ReactNode
};

export type PopupBaseActions = {
    showModal: (content?: any) => any;
    hideModal: (content?: string) => any;
};
