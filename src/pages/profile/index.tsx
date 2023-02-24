import IcTwoPeople from 'assets/icon/ic_twopeople.svg';
import { profile } from 'assets/static-data/profile';
import classNames from 'classnames/bind';
import { STATE_IDENTITY, TABS_PROFILE, TAB_INDEX } from 'commons/constants';
import Languages from 'commons/languages';
import AvatarHoverImage from 'components/avatar-hover-image';
import DrawerMobileAccount, { DrawerBaseActions } from 'components/drawer-mobile-account';
import Footer from 'components/footer';
import SelectPhoto, { SelectPhotoAction } from 'components/select-photo';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import { observer } from 'mobx-react';
import { ItemScreenModel } from 'models/profile';
import { UpdateInfoModal, UserInfoModel } from 'models/user-model';
import Policy from 'pages/profile/policy';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toasty from 'utils/toasty';
import AccountLink from './account-link';
import InfoChangePwd from './change-pwd';
import Commission from './commission';
import InfoAccount from './info-account';
import InfoIdentity from './info-identity';
import InfoPayment from './Info-payment';
import InviteFriend from './invite-friend';
import styles from './profile.module.scss';
import QuestionAnswer from './question-answer';
import UserManual from './user-manual';

const cx = classNames.bind(styles);

const Profile = observer(({ numberTabs, onResetNumberTabs }: { numberTabs: number | undefined, onResetNumberTabs?: any }) => {
    const { userManager, apiServices } = useAppStore();
    const isMobile = useIsMobile();
    const [info, setInfo] = useState<UserInfoModel>();
    const [step, setStep] = useState<number>(TABS_PROFILE.INFO_ACCOUNT);

    const refDrawer = useRef<DrawerBaseActions>(null);
    const refAvatarPhoto = useRef<SelectPhotoAction>(null);

    useEffect(() => {
        if (numberTabs === TABS_PROFILE.INFO_IDENTITY) {
            setStep(TABS_PROFILE.INFO_IDENTITY);
        } else if (numberTabs) {
            setStep(numberTabs);
        }
        setInfo(userManager.userInfo);
    }, [numberTabs, userManager.userInfo]);

    const onOpenIdentity = useCallback(() => {
        setStep(0);
        onResetNumberTabs?.(TAB_INDEX.PROFILE);
    }, [onResetNumberTabs]);

    const renderViewRight = useMemo(() => {
        switch (step) {
            case TABS_PROFILE.INFO_IDENTITY:
                return <InfoIdentity />;
            case TABS_PROFILE.INFO_ACCOUNT:
                return <InfoAccount />;
            case TABS_PROFILE.INFO_PAYMENT:
                return <InfoPayment />;
            case TABS_PROFILE.INFO_CHANGE_PWD:
                return <InfoChangePwd />;
            case TABS_PROFILE.ACCOUNT_LINK:
                return <AccountLink />;
            case TABS_PROFILE.COMMISSION:
                return <Commission />;
            case TABS_PROFILE.POLICY:
                return <Policy isInLink={true} />;
            case TABS_PROFILE.INVITE_FRIEND:
                return <InviteFriend />;
            case TABS_PROFILE.USER_MANUAL:
                return <UserManual />;
            case TABS_PROFILE.QUESTION_ANSWER:
                return <QuestionAnswer />;
            default:
                return;
        }
    }, [step]);

    const onTabs = useCallback((indexTabs: number) => {
        setStep(indexTabs);
        onResetNumberTabs?.(TAB_INDEX.PROFILE);
    }, [onResetNumberTabs]);

    const onShowDrawer = useCallback(() => {
        refDrawer.current?.show();
    }, []);

    const renderViewMobile = useMemo(() => {
        return (
            <div className={cx('mobile-view-container')}>
                {renderViewRight}
            </div>
        );
    }, [renderViewRight]);

    const renderStatusAcc = useMemo(() => {
        switch (info?.tinh_trang?.auth) {
            case STATE_IDENTITY.UN_VERIFIED:
                return (
                    <div className={cx('un-verify-container', 'hover-component')} onClick={onOpenIdentity}>
                        <span className={cx('un-verify-text')} >{info?.tinh_trang?.status}</span>
                    </div>
                );
            case STATE_IDENTITY.VERIFIED:
                return (
                    <div className={cx('verify-container', 'hover-component')} onClick={onOpenIdentity}>
                        <span className={cx('verify-text')} >{info?.tinh_trang?.status}</span>
                    </div>
                );
            case STATE_IDENTITY.WAIT:
                return (
                    <div className={cx('wait-verify-container', 'hover-component')} onClick={onOpenIdentity}>
                        <span className={cx('wait-verify-text')}>{info?.tinh_trang?.status}</span>
                    </div>
                );
            default:
                return (
                    <div className={cx('un-verify-container', 'hover-component')} onClick={onOpenIdentity}>
                        <span className={cx('un-verify-text')} >{info?.tinh_trang?.status}</span>
                    </div>
                );
        }
    }, [info, onOpenIdentity]);

    const handleAvatar = useCallback(() => {
        refAvatarPhoto.current?.show?.();
    }, []);

    const handleChangeAvatarImage = useCallback(async (event: any) => {
        const getAvatarPath = await apiServices?.common.uploadImage(event.target.files[0]);
        if (getAvatarPath.success) {
            const data = getAvatarPath?.data as string;
            const resUpdateAvatar = await apiServices.auth.updateUserInf(
                data,
                '',
                '',
                ''
            ) as any;

            if (resUpdateAvatar.success) {
                resUpdateAvatar.data as UpdateInfoModal;
                toasty.success(Languages.profile.successEditAvatar);
                userManager.updateUserInfo({
                    ...userManager.userInfo,
                    avatar_user: data
                });
                refDrawer.current?.hide?.();
            }
        } else {
            toasty.error(Languages.errorMsg.uploadingError);
        }

    }, [apiServices.auth, apiServices?.common, userManager]);

    const renderViewWeb = useMemo(() => {
        return (
            <div className={cx('web-view-container')}>
                <div className={cx('profile')}>
                    <div className={cx('avatar')}>
                        <AvatarHoverImage image={info?.avatar_user} onPress={handleAvatar} />
                        <span className={cx('text-gray medium h5 y20')}>{info?.full_name}</span>
                        {renderStatusAcc}
                    </div>
                    {profile.map((item: ItemScreenModel, index: number) => {
                        const onChangeStep = () => {
                            setStep(item?.id);
                            onResetNumberTabs?.(TAB_INDEX.PROFILE);
                        };
                        return (
                            <div key={index} onClick={onChangeStep}
                                className={item?.id === step
                                    ? cx(index + 1 === profile.length ? 'item-focus-last-navigate' : 'item-focus-navigate')
                                    : cx(index + 1 === profile.length ? 'item-last-navigate' : 'item-navigate')}
                            >
                                <div className={cx('icon-menu')}>
                                    <img src={item?.icon} />
                                </div>
                                <span className={cx('xl10 h7 text-gray')}>{item?.title}</span>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('information', 'wid-70')}>
                    {renderViewRight}
                </div>
            </div>
        );
    }, [handleAvatar, info, onResetNumberTabs, renderStatusAcc, renderViewRight, step]);

    return (
        <>
            {isMobile && <div className={cx('row space-between y20', 'top')}>
                <span className={cx('text-black medium h7')}>{userManager.userInfo?.full_name}</span>
                <img src={IcTwoPeople} onClick={onShowDrawer} />
            </div>}
            <div className={cx(isMobile ? 'page-container-mobile' : 'page-container')}>
                {isMobile ? renderViewMobile : renderViewWeb}
                <DrawerMobileAccount ref={refDrawer}
                    onChangeStep={onTabs}
                    data={profile}
                    onPressStatus={onOpenIdentity}
                    onPressAvatar={handleAvatar}
                    numberTabs={step}
                />
                <Footer />
                <SelectPhoto ref={refAvatarPhoto} onChangeText={handleChangeAvatarImage} />
                {/* <LazyImage />/ */}
            </div>
        </>


    );
});

export default Profile;
