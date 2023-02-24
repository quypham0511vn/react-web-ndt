export enum BUTTON_STYLES {
    RED = 'RED',
    GRAY = 'GRAY',
    WHITE = 'WHITE',
    GREEN = 'GREEN',
    OUTLINE_GREEN = 'OUTLINE_GREEN',
    OUTLINE_RED = 'OUTLINE_RED',
    OUTLINE_BLUE = 'OUTLINE_BLUE',
}


export type ButtonProps = {
    label?: string | number;
    buttonStyle?: keyof typeof BUTTON_STYLES;
    fontSize?: number;
    containButtonStyles?: string;
    customStyles?: any;
    labelStyles?: string;
    rightIconStyles?: any;
    spinnerClass?: string;
    icon?: any;
    isLoading?: boolean;
    leftIcon?: any;
    rightIcon?: any;
    onPress?: (tag?: string) => any;
    disabled?: boolean;
    hasRightIcon?: boolean,
    isIconFont?: boolean,
    isLowerCase?: boolean,
    tag?: any,
    radius?: any,
    style?: any,
    width?: number | string | null
};
