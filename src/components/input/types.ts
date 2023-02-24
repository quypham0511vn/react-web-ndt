import { HTMLInputTypeAttribute } from 'react';

export type TextFieldProps = {
    capitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined,
    type: HTMLInputTypeAttribute,
    label?: string;
    value?: string | number;
    placeHolder?: string;
    isPassword?: boolean;
    rightIcon?: string;
    disabled?: boolean;
    hasUnderline?: boolean;
    multiline?: boolean;
    maxLength?: number;
    formatPrice?: boolean;
    formatNumber?: boolean;
    formatEmail?: boolean;
    verified?: boolean;
    showRestriction?: boolean;
    priceSuffix?: string;
    backgroundColor?: any;
    leftIcon?: string;
    iconSize?: number;
    inputStyle?: any;
    styleDisable?: any;
    inputStylePwDIcon?: any,
    containerInput?: any;
    hideIconClear?: boolean;
    minHeight?: number | string;
    maxHeight?: number | string;
    onChangeText?: any;
    containerStyle?: any;
    styleIconRight?: any;
    onKeyPress?: any;
    isIcon?: boolean | undefined;
    max?: any;
    min?: any;
    important?: boolean;
    labelRight?: string;
    spellCheck?: boolean;
    pattern?: string;
    onEndEditing?: (text: string, tag?: string) => any;
    onClickRightIcon?: (text: string) => any;
    onFocusCallback?: (tag?: string) => any;
    onRightCallback?: () => any;
}

export type TextFieldActions = {
    setValue: (text: string | number) => void;
    fillValue: (text: string | number) => void;
    getValue: () => any;
    focus: () => void;
    blur: () => void;
    setErrorMsg: (msg?: string) => void;
    eventTextChange: (text?: string) => void;
};

