import classNames from 'classnames/bind';
import React, { forwardRef, ReactNode, useCallback, useImperativeHandle, useRef, useState } from 'react';
import styles from './check-box.module.scss';

export type CheckBoxProps = {
    title?: string | ReactNode;
    value?: any;
    groupCheckBoxContainer?: any;
    onChangeText?: (event?: any) => any;
};

export type CheckBoxAction = {
    getValue?: (text?: string | number) => void,
    setValue?: (text?: string) => void,
    clearValue?: () => void
};

const cx = classNames.bind(styles);

const CheckBox = forwardRef<CheckBoxAction, CheckBoxProps>(({ title, onChangeText, groupCheckBoxContainer, value }: CheckBoxProps, ref: any) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const orgTextInput = useRef<HTMLInputElement>(null);

    const [isCheck, setIsCheck] = useState<boolean>(false);

    const focus = useCallback(() => {
        if (orgTextInput.current) {
            orgTextInput.current?.focus();
        }
        setIsFocus(true);
    }, []);

    const clearValue = useCallback(() => {
        setIsCheck(false);
    }, []);

    useImperativeHandle(ref, () => ({
        getValue,
        clearValue
    }));

    const getValue = useCallback(() => {
        return isCheck;
    }, [isCheck]);

    const renderItemCheckbox = useCallback(() => {
        const onChange = (e: any) => {            
            onChangeText?.(e);
            setIsCheck(e.target.checked);
        };
        return (
            <div className={cx('container')}>
                <input
                    ref={orgTextInput}
                    type='checkbox'
                    id={'check'}
                    onFocus={focus}
                    onChange={onChange}
                    checked={isCheck}
                />
                <label htmlFor={'check'} className={cx('check-mark')}></label>
            </div>
        );
    }, [focus, isCheck, onChangeText]);

    return (
        <div className={cx(groupCheckBoxContainer || 'group-check-box-container')}>
            {renderItemCheckbox()}
            <span className={cx('title-check-box')}>{title}</span>
        </div>
    );
});

export default CheckBox;
