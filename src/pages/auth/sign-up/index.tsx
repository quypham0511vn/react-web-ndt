import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import IcGoogle from 'assets/icon/ic_google.svg';
import IcPhone from 'assets/icon/ic_phone.svg';
import IcEmail from 'assets/image/ic_email.svg';
import IcProfile from 'assets/image/ic_profile.svg';
import IcReferralCode from 'assets/image/ic_referral_code.svg';
import { dataChooseYesOrNo } from 'assets/static-data/auth';
import classNames from 'classnames/bind';
import { CHANNEL, TYPE_INPUT } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import RadioGroup from 'components/radio-group';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { ItemProps, ItemRadioModel } from 'models/common';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import formValidate from 'utils/form-validate';
import styles from './sign-up.module.scss';

const cx = classNames.bind(styles);

function SignUp({ onPress, dataChannel, onLoginGoogle, refNumber }
    : {
        onPress: any,
        dataChannel: ItemProps[],
        onLoginGoogle: any,
        refNumber?: string,
    }) {
    const isMobile = useIsMobile();
    const [isLoading, setLoading] = useState<boolean>(false);
    const { apiServices } = useAppStore();
    const [checkBox, setCheckBox] = useState<boolean>(false);
    const [isShowReferral, setShowReferral] = useState<boolean>(false);
    const [isEmployee, setIsEmployee] = useState<number>(0);
    const refPhone = useRef<TextFieldActions>(null);
    const refName = useRef<TextFieldActions>(null);
    const refEmail = useRef<TextFieldActions>(null);
    const refPwdConfirm = useRef<TextFieldActions>(null);
    const refPresenter = useRef<TextFieldActions>(null);
    const refChannel = useRef<PickerAction>(null);

    const refPwd = useRef<TextFieldActions>(null);

    useEffect(() => {
        if (refNumber) {
            refChannel?.current?.setValue(dataChannel.find(item => item.value === CHANNEL.FRIEND)?.value || '');
            setShowReferral(true);
        }
    }, [dataChannel, refNumber]);

    const onChange = (e: CheckboxChangeEvent) => {
        setCheckBox(e.target.checked);
    };

    const onValidate = useCallback(() => {
        const phone = refPhone.current?.getValue();
        const pwd = refPwd.current?.getValue();
        const email = refEmail.current?.getValue();
        const pwdConfirm = refPwdConfirm.current?.getValue();
        const name = refName.current?.getValue();
        const presenter = refPresenter.current?.getValue();
        const channel = refChannel.current?.getValue();

        const errMsgPhone = formValidate.passConFirmPhone(phone);
        const errMsgName = formValidate.userNameValidate(name);
        const errMsgPwd = formValidate.passValidate(pwd);
        const errMsgEmail = formValidate.emailValidate(email);
        const errMsgConfirm = formValidate.passConFirmValidate(pwd, pwdConfirm);
        const errMsgPresenter = isShowReferral ? formValidate.passConFirmPhone(presenter) : '';
        const errMsgChannel = formValidate.emptyValidate(channel || '');

        refPhone.current?.setErrorMsg(errMsgPhone);
        refPwd.current?.setErrorMsg(errMsgPwd);
        refName.current?.setErrorMsg(errMsgName);
        refPwdConfirm.current?.setErrorMsg(errMsgConfirm);
        refEmail.current?.setErrorMsg(errMsgEmail);
        refPresenter.current?.setErrorMsg(errMsgPresenter);
        refChannel?.current?.setError(errMsgChannel);

        if (!formValidate.isValidAll([errMsgPhone, errMsgPwd, errMsgName, errMsgConfirm, errMsgEmail, errMsgPresenter, errMsgChannel])) {
            return true;
        }
        return false;
    }, [isShowReferral]);

    const onSignUp = useCallback(async () => {
        if (onValidate()) {
            setLoading(true);
            const res = await apiServices.auth.registerAuth(
                refPhone.current?.getValue(),
                refName.current?.getValue(),
                refPwd.current?.getValue(),
                refPwdConfirm.current?.getValue(),
                refEmail.current?.getValue(),
                refChannel.current?.getValue() || '',
                refPresenter.current?.getValue() || '',
                isEmployee
            ) as any;
            setLoading(false);
            if (res.success) {
                onPress?.({ name: Languages.auth.enterAuthCode, phone: refPhone.current?.getValue(), password: refPwd.current?.getValue(), title: Languages.auth.signUp, checkbox: checkBox });
            }
        }
    }, [apiServices.auth, checkBox, isEmployee, onPress, onValidate]);

    const onNavigate = useCallback((title: string) => {
        onPress?.({ name: title });
    }, [onPress]);

    const onChooseChannel = useCallback((_channel: string) => {
        if (_channel === CHANNEL.FRIEND) {
            setShowReferral(true);
        } else {
            setShowReferral(false);
        }
    }, []);

    const onClear = useCallback(() => {
        setShowReferral(false);
    }, []);

    const onChooseIsEmployee = useCallback((item: ItemRadioModel) => {
        setIsEmployee(Number(item?.value));
    }, []);

    const renderRightContent = useMemo(() => {
        return <div className={isMobile ? cx('right-container-mobile') : cx('right-container', 'scroll')}>
            <span className={cx('text-black medium h4 y20')}>
                {Languages.auth.signUp}
            </span>

            <span className={cx('text-gray h7 y5 b15')}>
                {Languages.auth.registerAccountNow}
            </span>

            <MyTextInput
                ref={refName}
                type={TYPE_INPUT.TEXT}
                label={Languages.auth.name}
                placeHolder={Languages.auth.name}
                important
                rightIcon={IcProfile}
                containerStyle={cx('y15')}
                value={''}
                maxLength={50}
            />

            <MyTextInput
                ref={refEmail}
                type={TYPE_INPUT.EMAIL}
                label={Languages.auth.email}
                placeHolder={Languages.auth.email}
                important
                rightIcon={IcEmail}
                containerStyle={cx('y15')}
                value={''}
                maxLength={50}
            />

            <MyTextInput
                ref={refPhone}
                type={TYPE_INPUT.TEL}
                label={Languages.auth.phone}
                placeHolder={Languages.auth.phone}
                important
                containerStyle={cx('y15')}
                rightIcon={IcPhone}
                value={''}
                maxLength={10}
            />

            <MyTextInput
                ref={refPwd}
                type={TYPE_INPUT.PASSWORD}
                label={Languages.auth.pwd}
                placeHolder={Languages.auth.pwd}
                containerStyle={cx('y15')}
                important
                value={''}
                maxLength={50}
            />

            <MyTextInput
                ref={refPwdConfirm}
                type={TYPE_INPUT.PASSWORD}
                label={Languages.auth.pwdConfirm}
                placeHolder={Languages.auth.pwdConfirm}
                important
                containerStyle={cx('y15')}
                value={''}
                maxLength={50}
            />

            <RadioGroup
                data={dataChooseYesOrNo}
                label={Languages.auth.questionIsEmployee}
                defaultValue={isEmployee.toString()}
                onPress={onChooseIsEmployee}
            />

            <PickerComponent
                ref={refChannel}
                data={dataChannel}
                title={Languages.auth.channel}
                placeholder={Languages.auth.channel}
                mainContainer={cx('y15', 'picker-container')}
                titleItemPickerText={'text-gray h7 regular b5'}
                isImportant
                showSearch={false}
                disable={!!refNumber}
                showArrow={!!refNumber}
                onClear={onClear}
                onSelectItem={onChooseChannel}
            />

            {isShowReferral && <MyTextInput
                ref={refPresenter}
                type={TYPE_INPUT.TEL}
                label={Languages.auth.presenter}
                placeHolder={Languages.auth.presenter}
                containerStyle={cx('y15')}
                rightIcon={IcReferralCode}
                value={refNumber}
                maxLength={10}
                disabled={!!refNumber}
                important
            />}

            <div className={cx('row-center y20')}>
                <Checkbox className={cx('text-gray h7')}
                    onChange={onChange}>
                    {Languages.auth.savePwd}</Checkbox>
                {!refNumber && <a className={cx('text-red h7', 'hover-text')} onClick={() => onNavigate(Languages.auth.forgotPwd)}>
                    {Languages.auth.forgotPwd}
                </a>}
            </div>

            <Button
                label={Languages.auth.register}
                buttonStyle={BUTTON_STYLES.GREEN}
                isLowerCase
                onPress={onSignUp}
                containButtonStyles={'y20'}
                customStyles={{ padding: 10 }}
                isLoading={isLoading}
            />

            <div className={cx('row-center y20')}>
                <div className={cx('line')} />
                <span className={cx('text-gray h7 p5')}>
                    {Languages.auth.or}
                </span>
                <div className={cx('line')} />
            </div>

            <div className={cx('row-center y20')}>
                <Button
                    label={Languages.auth.google}
                    buttonStyle={BUTTON_STYLES.OUTLINE_RED}
                    isLowerCase
                    containButtonStyles={'flex'}
                    rightIcon={IcGoogle}
                    onPress={onLoginGoogle}
                />
            </div>

            {!refNumber && <div className={cx('row y20')}>
                <span className={cx('text-gray h6 x5')}>
                    {Languages.auth.accountYet}
                </span>
                <a className={cx('text-green h6', 'hover-text')} onClick={() => onNavigate(Languages.auth.login)}>
                    {Languages.auth.loginNow}
                </a>
            </div>}
        </div>;
    }, [isMobile, isEmployee, onChooseIsEmployee, dataChannel, refNumber, onClear, onChooseChannel, isShowReferral, onSignUp, isLoading, onLoginGoogle, onNavigate]);

    const renderView = useMemo(() => {
        return <>
            {renderRightContent}
        </>;
    }, [renderRightContent]);

    return renderView;
}

export default SignUp;
