import classNames from 'classnames/bind';
import Spinner from 'components/spinner';
import React, { useCallback, useMemo } from 'react';
import { COLORS } from 'theme/colors';
import styles from './button.module.scss';
import { ButtonProps, BUTTON_STYLES } from './types';

const cx = classNames.bind(styles);

export const Button = ({
    label,
    isLoading,
    onPress,
    disabled,
    isLowerCase,
    leftIcon,
    tag,
    buttonStyle,
    containButtonStyles,
    customStyles,
    width,
    rightIcon,
    rightIconStyles,
    labelStyles,
    spinnerClass
}: ButtonProps) => {

    const _onPress = useCallback(() => {
        onPress?.(tag || label);
    }, [label, onPress, tag]);

    const containerStyle = useMemo<any>(() => {
        let style: string;

        switch (buttonStyle) {
            case BUTTON_STYLES.RED:
                style = styles.btn_red;
                break;
            case BUTTON_STYLES.OUTLINE_GREEN:
                style = styles.btn_outline_green;
                break;
            case BUTTON_STYLES.OUTLINE_RED:
                style = styles.btn_outline_red;
                break;
            case BUTTON_STYLES.OUTLINE_BLUE:
                style = styles.btn_outline_blue;
                break;
            case BUTTON_STYLES.GREEN:
                style = styles.btn_green;
                break;
            case BUTTON_STYLES.GRAY:
            default:
                style = styles.btn_gray;
                break;
        }
        return `${style}`;
    }, [buttonStyle]);

    const mergerLabelStyle = useMemo<any>(() => {
        let style: string;

        switch (buttonStyle) {
            case BUTTON_STYLES.OUTLINE_GREEN:
                style = styles.btn_txt_green;
                break;
            case BUTTON_STYLES.OUTLINE_RED:
                style = styles.btn_txt_red;
                break;
            case BUTTON_STYLES.OUTLINE_BLUE:
                style = styles.btn_txt_blue;
                break;
            case BUTTON_STYLES.GRAY:
                style = styles.btn_txt_gray;
                break;
            default:
                style = styles.btn_txt_white;
                break;
        }

        return `${style}`;
    }, [buttonStyle]);


    const spinnerColor = useMemo<string>(() => {
        let color: string;

        switch (buttonStyle) {
            case BUTTON_STYLES.OUTLINE_GREEN:
            case BUTTON_STYLES.OUTLINE_RED:
            case BUTTON_STYLES.OUTLINE_BLUE:
                color = COLORS.GREEN;
                break;
            default:
                color = COLORS.WHITE;
                break;
        }

        return color;
    }, [buttonStyle]);

    return (
        <button
            disabled={isLoading || disabled}
            className={cx(`${containerStyle} ${containButtonStyles ? containButtonStyles : ''}`)}
            style={{ ...customStyles, width: width + '%' }}
            onClick={_onPress}
        >
            {isLoading && <Spinner color={spinnerColor} className={spinnerClass ? spinnerClass : cx('spinner')} />}
            {leftIcon}
            {
                label && <span className={labelStyles ? labelStyles : cx(`${mergerLabelStyle}`)}>
                    {isLowerCase ? label : `${label}`.toUpperCase()}
                </span>
            }
            {rightIcon &&
                <img
                    src={rightIcon}
                    className={rightIconStyles ? cx(`${rightIconStyles}`) : cx('icon-right-styles')}
                />}
        </button>
    );
};


