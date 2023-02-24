

export type TextAreaProps = {
    capitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined,
    type?: 'radio' | 'email' | 'phone' | 'text' | 'number' | 'password',

    allowClear?: boolean;
    defaultValue?: string;
    bordered?: boolean;
    autoSize?: boolean | object;

    label?: string;
    value?: string | number;
    placeHolder?: string;
    isPassword?: boolean;
    rightIcon?: string;
    disabled?: boolean;
    hasUnderline?: boolean;
    multiline?: boolean;
    maxLength?: number;
    verified?: boolean;
    priceSuffix?: string;
    backgroundColor?: any;
    leftIcon?: string;
    iconSize?: number;
    inputStyle?: any;
    styleDisable?: any;
    important?:boolean;
    inputStylePwDIcon?: any,
    containerInput?: any;
    hideIconClear?: boolean;
    minHeight?: number | string;
    maxHeight?: number | string;
    onChangeText?: any;
    styleGroup?: any;
    styleIconRight?: any;
    onKeyPress?: any;
    isIcon?: boolean | undefined;
    spellCheck?: boolean;
    onEndEditing?: (text: string, tag?: string) => any;
    onClickRightIcon?: (text: string) => any;
    onFocusCallback?: (tag?: string) => any;
    onPressEnter?: (text?: any) => any;
    onResize?: (width?: number, height?: number) => any;
}

export type TextAreaActions = {
    setValue: (text: string | number) => void;
    fillValue: (text: string | number) => void;
    getValue: () => any;
    focus: () => void;
    blur: () => void;
    setErrorMsg: (msg?: string) => void;
    eventTextChange: (text?: string) => void;
};

