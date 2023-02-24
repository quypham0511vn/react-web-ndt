import IcPhone from 'assets/icon/ic_phone.svg';
import IcReferralCode from 'assets/image/ic_referral_code.svg';
import { dataChooseYesOrNo } from 'assets/static-data/auth';
import classNames from 'classnames/bind';
import { CHANNEL } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerComponent, { PickerAction } from 'components/picker-component/picker-component';
import RadioGroup from 'components/radio-group';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import sessionManager from 'managers/session-manager';
import { LoginWithThirdPartyModel } from 'models/auth';
import { ItemRadioModel } from 'models/common';
import { UserInfoModel } from 'models/user-model';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import formValidate from 'utils/form-validate';
import toasty from 'utils/toasty';
import utils from 'utils/utils';
import styles from './sign-up-google.module.scss';

const cx = classNames.bind(styles);

const SignUpGoogle = (({ onPress, dataChannel, data, refNumber, onSuccess }) => {
    const timer = useRef<number>(180);
    const isMobile = useIsMobile();
    const [errMsg, setErrMsg] = useState<string>('');
    const [timerCount, setTimerCount] = useState<number>(180);
    const [checkOTP, setCheckOTP] = useState<boolean>(false);
    const [isShowReferral, setShowReferral] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formData = useRef({
        phone: '',
        channel: '',
        code: '',
        otp: '',
        isEmployee: 0
    });
    const refPhone = useRef<TextFieldActions>(null);
    const refChannel = useRef<PickerAction>(null);
    const refCode = useRef<TextFieldActions>(null);

    const { apiServices, userManager } = useAppStore();

    useEffect(() => {
        setCheckOTP(false);
    }, []);

    useEffect(() => {
        if (refNumber) {
            const chanelId = dataChannel.find(item => item.value === CHANNEL.FRIEND)?.value || '';
            refChannel?.current?.setValue(chanelId);
            setShowReferral(true);

            formData.current.channel = chanelId;
            formData.current.code = refNumber;
        }
    }, [dataChannel, refNumber]);

    const refreshCountdown = useCallback(() => {
        setTimeout(() => {
            if (timer.current - 1 <= 0) {
                setTimerCount(0);
            } else {
                setTimerCount(timer.current - 1);
                timer.current = timer.current - 1;
                refreshCountdown();
            }
        }, 1000);
    }, [timer]);

    const onValidate = useCallback(() => {
        if (formData.current.otp.length === 0) {
            setErrMsg(Languages.errorMsg.emptyOTP);
            return false;
        }
        if (formData.current.otp.length < 6) {
            setErrMsg(Languages.errorMsg.userOTPLength);
            return false;
        } else if (formValidate.validateNumber(formData.current.otp)) {
            setErrMsg(Languages.errorMsg.errMsgOTP);
            return false;
        }
        return true;
    }, []);

    const onValidatePhone = useCallback(() => {
        setCheckOTP(false);
        const errMsgChannel = formValidate.emptyValidate(formData.current.channel || '');
        const errCode = isShowReferral ? formValidate.passConFirmPhone(formData.current.code) : '';
        const errPhone = formValidate.passConFirmPhone(formData.current.phone);
        refPhone.current?.setErrorMsg(errPhone);
        refChannel.current?.setError(errMsgChannel);
        if (isShowReferral) refCode.current?.setErrorMsg(errCode);
        if (`${errPhone}${errCode}${errMsgChannel}`.length === 0) {
            return true;
        }
        return false;
    }, [isShowReferral]);

    const onChangeOTP = useCallback((_otp: string) => {
        setErrMsg('');
        setToggle(last => !last);
        formData.current.otp = _otp;
    }, []);

    const onConfirmOTP = useCallback(async () => {
        if (onValidate()) {
            setIsLoading(true);
            const resActive = await apiServices?.auth?.activePhone(`${data?.id}` || '', formData.current.otp, data?.checksum || '') as any;
            setIsLoading(false);
            if (resActive.success) {
                const resData = resActive.data as LoginWithThirdPartyModel;
                sessionManager.setAccessToken(resData?.token);
                userManager.updateUserInfo(resActive.data as UserInfoModel);
                if (sessionManager.accessToken) {
                    setTimeout(() => {
                        onSuccess();
                    }, 500);
                }
            } else {
                toasty.error(resActive.message);
            }
        }
    }, [apiServices?.auth, data?.checksum, data?.id, onSuccess, onValidate, userManager]);

    const onSendToOTP = useCallback(async () => {
        if (timerCount === 0) {
            await onSendOTP();
        }
    }, [timerCount]);

    const renderViewOTP = useMemo(() => {
        return (
            <>
                <span className={cx('text-black medium h4')}>
                    {Languages.auth.enterAuthCode}
                </span>
                <div className={cx('row y10')}>
                    <span className={cx('text-gray h7 x5')}>
                        {Languages.auth.contentOTPStart}<span className={cx('text-black medium')}>{utils.formatHidePhoneNumber(`${formData.current.phone}`)}</span>{Languages.auth.contentOTPEnd}
                    </span>
                </div>
                <label className={cx('text-gray h7 x5 y30')}>
                    {Languages.auth.enterAuthCode}
                    <span className={cx('text-red h7 x5 pl3')}>{Languages.common.mustChoose}</span>
                </label>
                <div className={cx('row')}>
                    <OtpInput
                        value={formData.current.otp}
                        inputStyle={cx('input', 'h6 text-black')}
                        onChange={onChangeOTP}
                        numInputs={6}
                        containerStyle={cx('container-input')}
                        shouldAutoFocus
                        isInputNum
                    />
                </div>
                <div className={cx('message-error')}>
                    <span className={cx('text-red h7')}>{errMsg}</span>
                </div>
                <div className={cx('row')}>
                    <span className={cx('h6 text-gray y10', 'hover-text')} onClick={onSendToOTP}>
                        {timerCount > 0 ? Languages.auth.sendToAfterOTP : Languages.auth.sendToOTP}
                    </span>
                    {timerCount > 0 && <span className={cx('h6 text-red y10 p5')}>
                        {utils.convertSecondToMinutes(timerCount)}</span>}
                </div>
                <Button
                    label={Languages.auth.confirm}
                    buttonStyle={BUTTON_STYLES.GREEN}
                    isLowerCase
                    onPress={onConfirmOTP}
                    isLoading={isLoading}
                    containButtonStyles={'y20'}
                    customStyles={{ padding: 10 }}
                />
            </>
        );
    }, [errMsg, onChangeOTP, onConfirmOTP, onSendToOTP, timerCount, toggle, isLoading]);

    const onSendOTP = useCallback(async () => {
        if (onValidatePhone()) {
            const resActive = await apiServices?.auth?.updatePhone(
                data?.id || '',
                formData.current.phone,
                data?.checksum || '',
                formData.current.channel || '',
                formData.current.code,
                formData.current.isEmployee
            ) as any;
            if (resActive.success) {
                const resData = resActive.data as LoginWithThirdPartyModel;
                sessionManager.setAccessToken(resData?.token);
                userManager.updateUserInfo({ ...resData });
                setCheckOTP(true);
                setTimerCount(180);
                timer.current = 180;
                refreshCountdown();
            } else {
                toasty.error(resActive.message);
            }
        }
    }, [apiServices?.auth, data, onValidatePhone, refreshCountdown, userManager]);

    const onChooseChannel = useCallback((_channel: string) => {
        formData.current.channel = _channel;
        setToggle(last => !last);
        if (_channel === CHANNEL.FRIEND) {
            setShowReferral(true);
        } else {
            setShowReferral(false);
        }
    }, []);

    const onChangeText = useCallback((text: string, label: string) => {
        switch (label) {
            case Languages.auth.phone:
                return formData.current.phone = text;
            default:
                return formData.current.code = text;
        }
    }, []);

    const onNavigate = useCallback(() => {
        onPress?.({ name: Languages.auth.login });
    }, [onPress]);

    const onClear = useCallback(() => {
        setShowReferral(false);
        formData.current.channel = '';
        formData.current.code = '';
        setToggle(last => !last);
    }, []);

    const onChooseIsEmployee = useCallback((item: ItemRadioModel) => {
        formData.current.isEmployee = Number(item?.value);
    }, []);

    const renderViewPhone = useMemo(() => {
        return (
            <>
                <span className={cx('text-black medium h5')}>
                    {Languages.auth.socialGoogle}
                </span>
                <div className={cx('row y10')}>
                    <span className={cx('text-gray h7 x5')}>
                        {Languages.auth.contentLinkSocial}
                    </span>
                </div>
                <MyTextInput
                    ref={refPhone}
                    type={'phone'}
                    label={Languages.auth.phone}
                    placeHolder={Languages.auth.phone}
                    important
                    containerStyle={cx('y30')}
                    rightIcon={IcPhone}
                    value={formData.current.phone || ''}
                    maxLength={10}
                    onChangeText={onChangeText}
                />
                <PickerComponent
                    ref={refChannel}
                    data={dataChannel}
                    title={Languages.auth.channel}
                    defaultValue={''}
                    placeholder={Languages.auth.channel}
                    mainContainer={cx('y10', 'picker-container')}
                    titleItemPickerText={'text-gray h7 regular b5'}
                    isImportant
                    onClear={onClear}
                    onSelectItem={onChooseChannel}
                    disable={!!refNumber}
                    showArrow={!!refNumber}
                />
                {isShowReferral && <MyTextInput
                    ref={refCode}
                    type={'phone'}
                    label={Languages.auth.txtRefCode}
                    placeHolder={Languages.auth.txtRefCode}
                    important
                    containerStyle={cx('y10')}
                    rightIcon={IcReferralCode}
                    value={refNumber || formData.current.code || ''}
                    maxLength={10}
                    onChangeText={onChangeText}
                    disabled={!!refNumber}
                />}
                <RadioGroup
                    data={dataChooseYesOrNo}
                    label={Languages.auth.questionIsEmployee}
                    defaultValue={formData.current.isEmployee.toString()}
                    onPress={onChooseIsEmployee}
                />
                <Button
                    label={Languages.auth.sendOTP}
                    buttonStyle={BUTTON_STYLES.GREEN}
                    isLowerCase
                    onPress={onSendOTP}
                    containButtonStyles={'y20'}
                    customStyles={{ padding: 10 }}
                />
                <div className={cx('row y20')}>
                    <span className={cx('text-gray h6 x5')}>
                        {Languages.auth.accountYet}
                    </span>
                    <a className={cx('text-green h6', 'hover-text')} onClick={onNavigate}>
                        {Languages.auth.loginNow}
                    </a>
                </div>
            </>
        );
    }, [dataChannel, isShowReferral, onChangeText, onChooseChannel, onChooseIsEmployee, onClear, onNavigate, onSendOTP, refNumber, toggle]);

    const renderBody = useMemo(() => {
        return (
            <>
                {checkOTP ? renderViewOTP : renderViewPhone}
            </>
        );
    }, [checkOTP, renderViewOTP, renderViewPhone]);

    return (
        <div className={!isMobile ? cx('right-container-mobile') : cx('right-container', 'scroll')}>
            {renderBody}
        </div>
    );
});

export default SignUpGoogle;
