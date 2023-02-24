import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import IcGoogle from 'assets/icon/ic_google.svg';
import IcPhone from 'assets/icon/ic_phone.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import sessionManager from 'managers/session-manager';
import { toJS } from 'mobx';
import { UserInfoModel } from 'models/user-model';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
import formValidate from 'utils/form-validate';
import styles from './login.module.scss';
const cx = classNames.bind(styles);

function Login({ onPress, onLoginGoogle }) {
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const { apiServices, userManager } = useAppStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [checkBox, setCheckBox] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('');
    const [pass, setPwd] = useState<string>('');
    const refPhone = useRef<TextFieldActions>(null);
    const refPwd = useRef<TextFieldActions>(null);

    useEffect(() => {
        console.log('sessionManager', sessionManager.savePhone, sessionManager.savePwd);

        if (sessionManager.savePhone && sessionManager.savePwd) {
            setPhone(sessionManager.savePhone);
            setPwd(sessionManager.savePwd);
        }
    }, []);

    const onChange = (e: CheckboxChangeEvent) => {
        setCheckBox(e.target.checked);
    };

    const onValidate = useCallback(() => {
        const _phone = refPhone.current?.getValue();
        const pwd = refPwd.current?.getValue();

        const errMsgPhone = formValidate.passConFirmPhone(_phone);
        const errMsgPwd = formValidate.passValidate(pwd);

        refPhone.current?.setErrorMsg(errMsgPhone);
        refPwd.current?.setErrorMsg(errMsgPwd);

        if (!formValidate.isValidAll([errMsgPhone, errMsgPwd])) {
            return true;
        }
        return false;
    }, []);

    const onLogin = useCallback(async () => {
        if (onValidate()) {
            setLoading(true);
            const res = await apiServices.auth.loginPhone(refPhone.current?.getValue(), refPwd.current?.getValue()) as any;
            setLoading(false);

            if (res?.success) {
                const resData = res.data as UserInfoModel;
                sessionManager.setAccessToken(resData?.token);
                const resInfoAcc = await apiServices.auth.getUserInfo();
                if (resInfoAcc.data) {
                    if (!checkBox) {
                        sessionManager.setSavePhoneLogin();
                        sessionManager.setSavePassLogin();
                    } else {
                        sessionManager.setSavePhoneLogin(refPhone.current?.getValue());
                        sessionManager.setSavePassLogin(refPwd.current?.getValue());
                    }
                    const data = resInfoAcc?.data as UserInfoModel;
                    data.token = resData?.token;
                    userManager.updateUserInfo({
                        ...data
                    });
                }
                console.log('resInfoAcc ===', toJS(userManager.userInfo));
                setTimeout(() => {
                    navigate(Paths.home);
                }, 200);
            }
        }
    }, [apiServices.auth, checkBox, navigate, onValidate, userManager, isLoading]);

    const onNavigate = useCallback((title: string) => {
        onPress?.({ name: title });
    }, [onPress]);

    const renderRightContent = useMemo(() => {
        return <div className={cx(isMobile ? 'right-container-mobile' : 'right-container')}>
            <span className={cx('text-black medium h4')}>
                {Languages.auth.login}
            </span>

            <span className={cx('text-gray h7 y10')}>
                {Languages.auth.loginAccountNow}
            </span>

            <MyTextInput
                ref={refPhone}
                type={'phone'}
                label={Languages.auth.phone}
                placeHolder={Languages.auth.phone}
                important
                containerStyle={cx('y30')}
                rightIcon={IcPhone}
                value={phone}
                maxLength={10}
            />

            <MyTextInput
                ref={refPwd}
                type={'password'}
                label={Languages.auth.pwd}
                placeHolder={Languages.auth.pwd}
                containerStyle={cx('y15')}
                important
                value={pass}
                maxLength={50}
            />

            <div className={cx('row-center y20')}>
                <Checkbox className={cx('text-gray h7')}
                    onChange={onChange}>
                    {Languages.auth.savePwd}</Checkbox>
                <a className={cx('text-red h7', 'hover-text')} onClick={() => onNavigate(Languages.auth.forgotPwd)}>
                    {Languages.auth.forgotPwd}
                </a>
            </div>

            <Button
                label={Languages.auth.login}
                buttonStyle={BUTTON_STYLES.GREEN}
                isLowerCase
                isLoading={isLoading}
                onPress={onLogin}
                containButtonStyles={'y20'}
                customStyles={{ padding: 10 }}
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

            <div className={cx('row y20')}>
                <span className={cx('text-gray h6 x5')}>
                    {Languages.auth.notAccountYet}
                </span>
                <a className={cx('text-green h6', 'hover-text')} onClick={() => onNavigate(Languages.auth.register)}>
                    {Languages.auth.registerNow}
                </a>
            </div>
        </div>;
    }, [isMobile, onLogin, onLoginGoogle, onNavigate, pass, phone]);

    const renderView = useMemo(() => {
        return <>
            {renderRightContent}
        </>;
    }, [renderRightContent]);

    return renderView;
}

export default Login;
