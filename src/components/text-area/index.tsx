import classNames from 'classnames/bind';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from 'react';
import Validate from 'utils/validate';
import styles from './text-area.module.scss';
import { TextAreaActions, TextAreaProps } from './types';

const cx = classNames.bind(styles);

export const MyTextAreaInput = forwardRef<TextAreaActions, TextAreaProps>(
    (
        {
            label,
            value,
            placeHolder,
            allowClear,
            spellCheck,
            maxLength,
            disabled,
            containerInput,
            inputStyle,
            styleDisable,
            important,
            styleGroup,
            onKeyPress,
            rightIcon,
            onChangeText,
            styleIconRight,
            onClickRightIcon,
            onPressEnter
        }: TextAreaProps,
        ref?: any
    ) => {
        useImperativeHandle(ref, () => ({
            setValue,
            fillValue,
            getValue,
            focus,
            blur,
            setErrorMsg
        }));
        const [textfieldVal, setTextfieldVal] = useState<any>(`${value}`);
        const [errMsg, setErrMsg] = useState<string>('');
        const [isFocus, setIsFocus] = useState<boolean>(false);

        const orgTextInput = useRef<HTMLTextAreaElement>(null);

        useEffect(() => {
            if (onChangeText && isFocus) {
                onChangeText(textfieldVal, placeHolder);
            }
        }, [placeHolder, textfieldVal, value]);

        const setValue = useCallback(
            (text: any) => {
                if (text) {
                    setTextfieldVal?.(text);
                } else {
                    setTextfieldVal?.('');
                }
            },
            []
        );

        useEffect(() => {
            if (!Validate.isEmpty(value)) {
                setValue(value);
            }
        }, [setValue, value]);

        useEffect(() => {
            if (Validate.isEmpty(value)) {
                setIsFocus(false);
            }
        }, [value]);

        const _onChangeText = useCallback((e) => {
            if(e.target.value){
                setTextfieldVal?.(e.target.value);
            }else setTextfieldVal?.('');
            // console.log(e.target.value);
            
            setErrMsg('');
        }, []);

        const getValue = useCallback(() => {
            return textfieldVal?.trim() || '';
        }, [textfieldVal]);



        const fillValue = useCallback(
            (text: any) => {
                setValue(text);
            },
            [setValue]
        );

        const focus = useCallback(() => {
            if (orgTextInput.current) {
                orgTextInput.current?.focus();
            }
            setIsFocus(true);
        }, []);

        const blur = useCallback(() => {
            if (orgTextInput.current) {
                orgTextInput.current?.blur();
            }
            setIsFocus(false);
        }, []);

        const setErrorMsg = useCallback((msg: string) => {
            if (Validate.isStringEmpty(msg)) {
                return;
            }
            setIsFocus(false);
            setErrMsg(msg);
        }, []);

        const errorMessage = useMemo(() => {
            if (!Validate.isStringEmpty(errMsg)) {
                return <div className={cx('messageError')}>
                    <span className={cx('text-err')}> {errMsg}</span>
                </div>;
            }
            return null;
        }, [errMsg]);

        const handleClick = useCallback(() => {
            onClickRightIcon?.('');
        }, [onClickRightIcon]);

        return (
            <div className={cx(`${styles.boxGroupInput} ${styleGroup}`)}>
                {label ? <label className={cx(styles.label)}>
                    {label}
                    {important && ' *'}
                </label> : ''}
                <div className={cx(`${containerInput}`, isFocus ? 'focus-input-container' : (errMsg ? 'error-input-container' : 'select-container'))}>
                    <textarea
                        ref={orgTextInput}
                        placeholder={placeHolder}
                        value={textfieldVal}
                        onChange={_onChangeText}
                        maxLength={maxLength}
                        disabled={disabled}
                        readOnly={disabled}
                        autoCapitalize={'none'}
                        onFocus={focus}
                        spellCheck={spellCheck || false}
                        onBlur={blur}
                        onKeyUp={onKeyPress}
                        className={cx(`${inputStyle ? inputStyle : 'input-style'} ${!disabled ? styleDisable : ''}`)}
                    />

                    {rightIcon && <img src={rightIcon} className={styleIconRight ? cx(`${styleIconRight}`) : cx('icon-right')} onClick={handleClick} />}
                </div>
                {errorMessage}
            </div>
        );
    }
);
