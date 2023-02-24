export type PopupActionTypes = {
    show: (content?: string) => any;
    hide: (content?: string) => any;
    setContent?: (message: string) => void;
    setErrorMsg?: (msg?: string) => any;
    setErrorOTP?: (message?: string) => any;
    updateChannel?: (channel: ItemProps) => any,
    wakeUp?: () => any,
};

export type PopupPropsTypes = {
    onClose?: () => any;
    onConfirm?: () => any;
    onBackdropPress?: () => any;
    title?: string;
    content?: string;
    btnText?: string;
    type?: string
};
