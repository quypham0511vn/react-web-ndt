import IcCancel from 'assets/image/ic_cancel.svg';
import IcSave from 'assets/image/ic_save.svg';

import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './change-pwd.module.scss';

import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import useIsMobile from 'hooks/use-is-mobile.hook';
import formValidate from 'utils/form-validate';
import { useAppStore } from 'hooks';
import { TYPE_INPUT } from 'commons/constants';
import toasty from 'utils/toasty';
import { observer } from 'mobx-react';

const cx = classNames.bind(styles);

const InfoChangePwd = observer(() => {
    const navigate = useNavigate();
    const { userManager, apiServices } = useAppStore();
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const refPassCurrent = useRef<TextFieldActions>(null);
    const refPassNew = useRef<TextFieldActions>(null);
    const refPassNewConfirm = useRef<TextFieldActions>(null);

    const renderInput = useCallback((_ref: any, label?: string, maxLength?: number, disabled?: boolean) => {
        return (
            <MyTextInput
                ref={_ref}
                type={TYPE_INPUT.PASSWORD}
                value={''}
                label={label}
                disabled={disabled}
                containerStyle={cx('y15')}
                maxLength={maxLength}
                placeHolder={label}
                isPassword
            />
        );

    }, []);

    const onChangeValidation = useCallback(() => {
        const _passCurrent = refPassCurrent.current?.getValue();
        const _passNew = refPassNew.current?.getValue();
        const _passConfirmNew = refPassNewConfirm.current?.getValue();

        const errMsgPassCurrent = formValidate.passValidate(_passCurrent);
        const errMsgPassNew = formValidate.passValidate(_passNew);
        const errMsgPassConfirmNew = formValidate.passConFirmValidate(_passNew, _passConfirmNew);

        refPassCurrent.current?.setErrorMsg(errMsgPassCurrent);
        refPassNew.current?.setErrorMsg(errMsgPassNew);
        refPassNewConfirm.current?.setErrorMsg(errMsgPassConfirmNew);

        if (`${errMsgPassCurrent}${errMsgPassNew}${errMsgPassConfirmNew}`.length === 0) {
            return true;
        } return false;

    }, []);

    const oncancel = useCallback(() => {
        refPassCurrent.current?.setValue('');
        refPassNew.current?.setValue('');
        refPassNewConfirm.current?.setValue('');
    }, []);

    const onSave = useCallback(async () => {
        if (onChangeValidation()) {
            setIsLoading(true);
            const res = await apiServices.auth.changePwd(refPassCurrent.current?.getValue(), refPassNewConfirm.current?.getValue()) as any;
            setIsLoading(false);
            if (res.success) {
                toasty.success(Languages.profile.successChangePassNotify);
                oncancel();
            }
        }
    }, [apiServices.auth, onChangeValidation, oncancel]);

    return (
        <div className={cx('content')}>
            <div className={cx('container-edit')}>
                <span className={cx('text-black h5 medium')}>{Languages.profile.changePass}</span>
                {renderInput(refPassCurrent, Languages.profile.passCurrent, 50, false)}
                {renderInput(refPassNew, Languages.profile.passNew, 50, false)}
                {renderInput(refPassNewConfirm, Languages.profile.passConfirmNew, 50, false)}
                <div className={cx('wid-100', 'row y20')}>
                    <Button
                        label={Languages.common.save}
                        labelStyles={cx('text-white h7 medium')}
                        rightIcon={IcSave}
                        containButtonStyles={cx('btn-container')}
                        isLowerCase
                        onPress={onSave}
                        isLoading={isLoading}
                    />
                    <Button
                        label={Languages.common.cancel}
                        labelStyles={cx('text-red h7 medium')}
                        rightIcon={IcCancel}
                        containButtonStyles={cx('btn-cancel')}
                        isLowerCase
                        onPress={oncancel}
                    />
                </div>
            </div>
        </div>

    );
});

export default InfoChangePwd;
