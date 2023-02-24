import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import React, { useCallback, useMemo, useRef } from 'react';
import formValidate from 'utils/form-validate';
import styles from './change-pwd.module.scss';

const cx = classNames.bind(styles);

function ChangePwd({ onPress }) {
    const isMobile = useIsMobile();

    // const { apiServices } = useAppStore();
    const refPwd = useRef<TextFieldActions>(null);
    const refPwdConfirm = useRef<TextFieldActions>(null);

    const onValidate = useCallback(() => {
        const pwd = refPwd.current?.getValue();
        const pwdConfirm = refPwdConfirm.current?.getValue();

        const errMsgPwd = formValidate.passValidate(pwd);
        const errMsgPwdConfirm = formValidate.passConFirmValidate(pwd, pwdConfirm);

        refPwd.current?.setErrorMsg(errMsgPwd);
        refPwdConfirm.current?.setErrorMsg(errMsgPwdConfirm);

        if (!formValidate.isValidAll([errMsgPwd, errMsgPwdConfirm])) {
            return true;
        }
        return false;
    }, []);

    const onChangePass = useCallback(async () => {

        if (onValidate()) {
            // const response = await apiServices.common.checkAppState();
            // console.log(response);
            // userManager.updateDemo(response.data);
            onPress?.({ name: Languages.auth.login });

        }
    }, [onPress, onValidate]);

    const onNavigate = useCallback((title: string) => {
        onPress?.({ name: title });
    }, [onPress]);

    const renderRightContent = useMemo(() => {
        return <div className={cx(isMobile ? 'right-container-mobile' : 'right-container')}>
            <span className={cx('text-black medium h4')}>
                {Languages.auth.changePwd}
            </span>
            <MyTextInput
                ref={refPwd}
                type={'password'}
                label={Languages.auth.pwd}
                placeHolder={Languages.auth.pwd}
                containerStyle={cx('y15')}
                important
                value={''}
                maxLength={50}
            />

            <MyTextInput
                ref={refPwdConfirm}
                type={'password'}
                label={Languages.auth.pwdConfirm}
                placeHolder={Languages.auth.pwdConfirm}
                containerStyle={cx('y15')}
                important
                value={''}
                maxLength={50}
            />

            <Button
                label={Languages.auth.changePwd}
                buttonStyle={BUTTON_STYLES.GREEN}
                isLowerCase
                onPress={onChangePass}
                containButtonStyles={'y20'}
                customStyles={{ padding: 10 }}
            />

            <div className={cx('row y10')}>
                <span className={cx('text-gray h6 x5')}>
                    {Languages.auth.accountYet}
                </span>
                <a className={cx('text-green h6')} onClick={() => onNavigate(Languages.auth.register)}>
                    {Languages.auth.loginNow}
                </a>
            </div>
        </div>;
    }, [isMobile, onChangePass, onNavigate]);

    const renderView = useMemo(() => {
        return <>
            {renderRightContent}
        </>;
    }, [renderRightContent]);

    return renderView;
}

export default ChangePwd;
