import classNames from 'classnames/bind';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import styles from './radio-invest-method.module.scss';
import IcBank from 'assets/image/ic_green_bank.svg';
import { Col, Row } from 'antd';
import IcNganLuong from 'assets/image/ic_ngan_luong.svg';
import { TYPE_TRANSFER_AMOUNT } from 'commons/constants';


interface RadioModel {
    id?: number | string;
    text?: string;
    value?: string;
    icon?: any;
}

type RadioProps = {
    title?: string,
    data?: RadioModel[],
    defaultValue?: any,
    groupRadioContainer?: any,
    groupInputContainer?: any,
    onChangeText?: any,
};

export type RadioAction = {
    getValue?: () => void,
    setValue?: (text?: string) => void,
};

const cx = classNames.bind(styles);

const RadioInvestMethod = forwardRef<RadioAction, RadioProps>(({
    data,
    onChangeText,
    defaultValue,
    groupRadioContainer,
    groupInputContainer
}: RadioProps, ref: any) => {

    const [selectedInput, setSelectedInput] = useState<string>(defaultValue);
    const orgTextInput = useRef<HTMLInputElement>(null);

    const focus = useCallback(() => {
        if (orgTextInput.current) {
            orgTextInput.current?.focus();
        }
    }, []);

    useImperativeHandle(ref, () => ({
        getValue,
        setValue
    }));

    const getValue = useCallback(() => {
        return selectedInput?.trim() || '';
    }, [selectedInput]);

    const setValue = useCallback((text: any) => {
        if (text) {
            setSelectedInput?.(text);
        } else {
            setSelectedInput?.('');
        }
    }, []);

    const onChange = useCallback((e?: any) => {
        onChangeText?.(e);
        const { id } = e.currentTarget;
        setSelectedInput(id);
    }, [onChangeText]);

    const renderIcon = useCallback((_title?: string) => {
        switch (_title) {
            case TYPE_TRANSFER_AMOUNT.NGAN_LUONG:
                return <img src={IcNganLuong} />;
            case TYPE_TRANSFER_AMOUNT.BANK:
                return <img src={IcBank} />;
            default:
                break;
        }
    }, []);

    return (
        <div className={groupRadioContainer || cx('invest-wrap')}>
            <Row gutter={[24, 8]} >
                {
                    data?.map((item: RadioModel, index: number) => {
                        return (
                            <Col xs={24} sm={24} md={24} lg={24} xl={12} key={index}>
                                <div className={cx(groupInputContainer || 'item-method-container')}>
                                    <div className={cx('item-method-left-container')}>
                                        {renderIcon(item?.value)}
                                        <span className={cx('item-method-text')}>{item?.text}</span>
                                    </div>
                                    <div className={cx('container')}>
                                        <input
                                            type='radio'
                                            id={item?.value}
                                            value={item?.value}
                                            checked={selectedInput === item?.value}
                                            onFocus={focus}
                                            onChange={onChange} />
                                        <label htmlFor={item?.value} className={cx('check-mark')}></label>
                                    </div>
                                </div>
                            </Col>
                        );
                    })
                }
            </Row>
        </div>
    );
});

export default RadioInvestMethod;
