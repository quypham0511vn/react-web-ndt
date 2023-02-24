import IcChoose from 'assets/image/ic_choose.svg';
import IcGoggle from 'assets/image/ic_gg.svg';
import IcNoVerify from 'assets/image/ic_red_round_close.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useMemo } from 'react';
import styles from './account-link.module.scss';

import { useAppStore } from 'hooks';
import { observer } from 'mobx-react';
import { UserInfoModel } from 'models/user-model';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseHelper from 'utils/firebase-helper';

const cx = classNames.bind(styles);

const AccountLink = observer(() => {

    const { apiServices, userManager } = useAppStore();

    const getInfo = useCallback(async () => {
        const resInfoAcc = await apiServices.auth.getUserInfo() as any;
        if (resInfoAcc.success) {
            const data = resInfoAcc?.data as UserInfoModel;
            userManager.updateUserInfo({
                ...data
            });
        }
    }, [apiServices.auth, userManager]);

    const onLoginGoogle = useCallback(() => {
        if (!userManager.userInfo?.id_google) {
            const provider = new GoogleAuthProvider();
            firebaseHelper.authGoogle.languageCode = 'it';
            provider.setCustomParameters({ prompt: 'select_account' });
            signInWithPopup(firebaseHelper.authGoogle, provider).then(async (result) => {

                const res = await apiServices?.auth?.linkGoogle(
                    'google',
                    result?.user.providerData[0].uid
                ) as any;
                if (res.success) {
                    getInfo();
                }
            }).catch((error) => {
                console.log('error ===', error);
            });
        }
    }, [apiServices?.auth, getInfo, userManager.userInfo?.id_google]);

    const renderContent = useMemo(() => {
        return (
            <div className={cx('content-container', userManager.userInfo?.id_google ? '' : 'hover-component')} onClick={onLoginGoogle}>
                <div className={cx('left-item')}>
                    <img src={IcGoggle} className={cx('img')} />
                    <div className={cx('describe')}>
                        <span className={cx('text-link')}>{Languages.profile.ggLink}</span>
                        <span className={cx('h6', userManager.userInfo?.id_google ? 'text-green' : 'text-red')}>
                            {userManager.userInfo?.id_google ? Languages.profile.linked : Languages.profile.unlinked}
                        </span>
                    </div>
                </div>
                <img src={userManager.userInfo?.id_google ? IcChoose : IcNoVerify} className={cx('img-small')} />
            </div>
        );
    }, [onLoginGoogle, userManager.userInfo?.id_google]);

    return (
        <div className={cx('page', 'padding', 'column')}>
            <span className={cx('text-black medium h5')}>{Languages.profile.accountLink}</span>
            {renderContent}
        </div>
    );
});

export default AccountLink;
