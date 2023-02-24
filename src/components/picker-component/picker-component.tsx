import { Select } from 'antd';
import IcArrow from 'assets/icon/ic_arrow_bottom.svg';
import IcClear from 'assets/icon/ic_delete.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { ItemPropsModel } from 'models/item-props-model';
import React, { forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styles from './picker-component.module.scss';
const cx = classNames.bind(styles);

type PickerProps = {
    data: ItemPropsModel[] | any,
    suffixIcon?: string,
    defaultValue?: string,
    value?: string;
    icLeft?: string,
    icRight?: string,
    disable?: boolean,
    notFoundComponent?: ReactNode,
    placeholder?: string,
    defaultOpen?: boolean,
    clearImage?: string,
    title?: string;
    isImportant?: boolean,
    autoFocus?: boolean,
    showSearch?: boolean,
    showArrow?: boolean,
    allowClear?: boolean,
    titleItemPickerText?: string,
    mainContainer?: string,
    itemContainer?: string,
    errorPickerText?: string,
    labelItemStyle?: string,
    isCheckbox?: boolean,
    listHeight?: number,
    dropdownRender?: (menu?: any) => any,
    onClose?: () => void,
    onOpen?: () => void,
    onClear?: () => void,
    onSelectItem?: (content: any) => void,
    onCheckbox?: () => any
};

export type PickerAction = {
    show?: (content?: string) => any,
    hide?: (content?: string) => any,
    getValue: (text?: string | number) => void,
    setValue: (text: string | number) => void,
    setError: (text: string) => any,
    clearValue?: () => void,
    getCheckBox?: () => void,
};

const PickerComponent = forwardRef<PickerAction, PickerProps>(
    (
        {
            data,
            title,
            suffixIcon,
            listHeight,
            onClose,
            onOpen,
            defaultValue,
            onSelectItem,
            onClear,
            value,
            clearImage,
            disable,
            defaultOpen,
            notFoundComponent,
            placeholder,
            isImportant,
            autoFocus,
            showSearch,
            showArrow,
            allowClear,
            mainContainer,
            itemContainer,
            titleItemPickerText,
            errorPickerText,
            labelItemStyle,
            icLeft,
            icRight,
            isCheckbox,
            dropdownRender,
            onCheckbox
        }: PickerProps,

        ref: any
    ) => {
        const { Option } = Select;
        const suffixImg = <img src={suffixIcon || IcArrow} />;
        const clearImg = <img src={clearImage || IcClear} />;

        const [visible, setVisible] = useState<boolean>(false);
        const [isCheck, setCheck] = useState<boolean>(!!defaultValue);
        const [textfieldVal, setTextfieldVal] = useState<any>(defaultValue);
        const pickerRef = useRef<any>(null);

        const [focus, setFocus] = useState<boolean>(false);
        const [errorState, setErrorState] = useState<string>('');

        useEffect(() => {
            if (isCheck) {
                onBlur();
                setTextfieldVal(defaultValue);
            } else {
                onBlur();
                setTextfieldVal(undefined);
            }

        }, [defaultValue, isCheck]);

        const hide = useCallback(() => {
            setVisible(false);
            pickerRef.current.blur();
            setFocus(false);
            onClose?.();
        }, [onClose]);

        const getCheckBox = useCallback(() => {
            return isCheck;
        }, [isCheck]);

        const show = useCallback(() => {
            setErrorState('');
            setVisible(true);
            onOpen?.();
            pickerRef.current?.focus();
        }, [onOpen]);

        const handleClear = useCallback(() => {
            onClear?.();
            setTextfieldVal?.(undefined);
        }, [onClear]);

        const getValue = useCallback(() => {
            return textfieldVal?.trim() || undefined;
        }, [textfieldVal]);

        const setValue = useCallback(
            (text: any) => {
                if (text) {
                    setTextfieldVal?.(text);
                } else {
                    setTextfieldVal?.(undefined);
                }
            }, []);

        const clearValue = useCallback(() => {
            setTextfieldVal?.(undefined);
        }, []);

        const onSelectWithEqualItem = useCallback(() => {
            hide?.();
        }, [hide]);

        const setError = useCallback((text: string) => {
            setErrorState?.(text);
        }, []);

        const handleSelectItem = useCallback((item: any) => {
            hide?.();
            setTextfieldVal?.(item);
        }, [hide]);

        useImperativeHandle(ref, () => ({
            show,
            hide,
            setError,
            getValue,
            setValue,
            clearValue,
            getCheckBox
        }));

        const onBlur = useCallback(() => {
            hide?.();
            pickerRef.current?.blur();
            setFocus(false);
        }, [hide]);

        const onFocus = useCallback(() => {
            show?.();
            setFocus(true);
            if (defaultOpen) {
                onBlur();
            }
        }, [defaultOpen, onBlur, show]);

        const onClickCheckbox = useCallback(() => {
            setCheck(!isCheck);
            onBlur();
            onCheckbox?.();
            setTextfieldVal(undefined);
        }, [isCheck, onBlur, onCheckbox]);

        const notFound = useMemo(() => {
            return(
                <span className={cx('not-found')}>{Languages.common.notFound}</span>
            );
        }, []);

        return (
            <div className={mainContainer ? mainContainer : cx('main-container')}>
                <div className={cx('wrap-all-title-picker')}>
                    {isCheckbox && <div className={cx('container')} onClick={onClickCheckbox}>
                        <input type="checkbox" checked={isCheck} onChange={() => { }} />
                        <span className={cx('check-mark')}></span>
                    </div>}
                    {title && <div className={cx('title-item-picker-container')}>
                        <label className={titleItemPickerText ? titleItemPickerText : cx(isCheckbox ? 'title-check-box-item-picker-text' : 'title-item-picker-text')}>{title}
                            {isImportant && <span className={cx('title-item-must-choose-picker')}>{Languages.common.mustChoose}</span>}
                        </label>
                    </div>}
                </div>

                <Select
                    listHeight={listHeight || 180}
                    ref={pickerRef}
                    autoClearSearchValue={!isCheck}
                    className={showArrow ? cx('disable-select-container') : cx(focus ? 'focus-select-container' : (errorState ? 'error-select-container' : 'select-container'))}
                    value={textfieldVal}
                    placeholder={placeholder || Languages.common.ok}
                    showSearch={showSearch}
                    size={'large'}
                    defaultOpen={defaultOpen}
                    disabled={isCheckbox ? !isCheck : disable}
                    open={visible}
                    autoFocus={autoFocus}
                    defaultValue={defaultValue}
                    allowClear={!allowClear}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    optionLabelProp={'label'}
                    onChange={handleSelectItem}
                    suffixIcon={suffixImg}
                    notFoundContent={notFoundComponent || notFound}
                    bordered={false}
                    dropdownRender={dropdownRender}
                    clearIcon={clearImg}
                    showArrow={!showArrow}
                    onClear={handleClear}
                    virtual={false}
                    dropdownMatchSelectWidth={false}
                    placement={'bottomLeft'}
                    getPopupContainer={trigger => trigger.parentNode}
                >
                    {data.map((item: any) => (
                        <Option key={item?.id} value={item?.value} label={item?.name || item?.text}>
                            <div className={itemContainer ? itemContainer : cx('item-container')} onClick={item?.value === textfieldVal ? onSelectWithEqualItem : () => onSelectItem?.(item.value)}>
                                {icLeft && <img src={icLeft} />}
                                <div className={cx('row center')}>
                                    {item?.icon && <img src={item?.icon} className={cx('left-icon')} />}
                                    <span className={cx('value-text')} >{item?.text}</span>
                                </div>
                                {icRight && <img src={icRight} />}
                            </div>
                        </Option>
                    ))}
                </Select>
                {errorState && <span className={errorPickerText ? errorPickerText : cx('text-error-picker')}>{errorState}</span>}
            </div >

        );
    });

export default PickerComponent;
