import { Tabs } from 'antd';
import IcTicked from 'assets/image/ic_green_round_ticked.svg';
import IcLogout from 'assets/image/ic_logout.svg';
import IcMenu from 'assets/image/ic_menu.svg';
import IcNotification from 'assets/image/ic_notification.svg';
import IcPopupAuth from 'assets/image/ic_popup_auth.svg';
import IcNoVerify from 'assets/image/ic_red_round_close.svg';
import IcLogo from 'assets/image/img_logo.jpeg';
import ImgNoAvatar from 'assets/image/img_no_avatar.jpg';
import { TabsMenuHeader } from 'assets/static-data/profile';
import classNames from 'classnames/bind';
import { AUTH_STATE, COLOR_TRANSACTION, Events, TABS_INVEST, TAB_INDEX } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { BUTTON_STYLES } from 'components/button/types';
import { DrawerBaseActions } from 'components/drawer-mobile-account';
import MenuMobile from 'components/menu-mobile';
import { PopupBaseActions } from 'components/modal/modal';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import { useAppStore } from 'hooks';
import useIsMobile from 'hooks/use-is-mobile.hook';
import sessionManager from 'managers/session-manager';
import { observer } from 'mobx-react';
import { NotificationTotalModel } from 'models/notification';
import { UserInfoModel } from 'models/user-model';
import Intro from 'pages/intro';
import InvestTab from 'pages/investment/invest-tab';
import Manage from 'pages/manage';
import News from 'pages/news';
import Notification from 'pages/notification';
import Profile from 'pages/profile';
import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Paths } from 'routers/paths';
import { COLORS } from 'theme/colors';
import { EventEmitter } from 'utils/event-emitter';
import styles from './home.module.scss';

const cx = classNames.bind(styles);
type PositionType = 'left' | 'right';

interface TabsModel {
    label: string,
    key: string,
    children: ReactNode
}

const Home = observer(() => {
    const navigate = useNavigate();
    const { userManager, apiServices, common } = useAppStore();
    const isMobile = useIsMobile();
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [numberTabsProfile, setNumberTabsProfile] = useState<number | undefined>(undefined);
    const [numberTabsInvest, setNumberTabsInvest] = useState<number | undefined>(undefined);
    const [numberTabsManage, setNumberTabsManage] = useState<number | undefined>(undefined);
    const [receptionData, setReceptionData] = useState<any>();
    const [size, setSize] = useState([0, 0]);
    const [tabBarGutter, setTabBarGutter] = useState<number>(0);

    const refPopupLogout = useRef<PopupBaseActions>(null);
    const refDrawer = useRef<DrawerBaseActions>(null);

    const [position] = useState<PositionType[]>(['left', 'right']);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        setTabBarGutter(size[0] / 80);
    }, [size]);

    const onForceLogOut = useCallback(() => {
        onClearDataAndLogout();
    }, []);

    const onLogOut = useCallback(() => {
        refPopupLogout.current?.showModal();
    }, []);

    const onHandleChangeTab = useCallback((index: number, indexTabs: number, data: any) => {
        setStepIndex(index);
        setReceptionData(data);
        if (index === TAB_INDEX.PROFILE) {
            setNumberTabsProfile(indexTabs);
        }
        if (index === TAB_INDEX.INVESTMENT) {
            setNumberTabsInvest(indexTabs);
        }
        if (index === TAB_INDEX.MANAGEMENT) {
            setNumberTabsManage(indexTabs);
        }
    }, []);

    const onResetNumberTabs = useCallback((index: number) => {
        if (index === TAB_INDEX.PROFILE) {
            setNumberTabsProfile(undefined);
        }
        if (index === TAB_INDEX.INVESTMENT) {
            setNumberTabsInvest(Number(TABS_INVEST.INVESTMENT));
        }
        if (index === TAB_INDEX.MANAGEMENT) {
            setNumberTabsManage(Number(0));
        }
    }, []);

    useEffect(() => {
        EventEmitter.on(Events.CHANGE_TAB, onHandleChangeTab);
        EventEmitter.on(Events.LOGOUT, onForceLogOut);
        return () => {
            EventEmitter.remove();
        };
    }, [onHandleChangeTab, onForceLogOut]);

    useEffect(() => {
        fetchAppConfig();
        getUnreadNotify();
    }, []);

    useEffect(() => {
        updateUserInfo();
    }, [stepIndex]);

    const fetchAppConfig = useCallback(async () => {
        const config = await apiServices.common.getAppConfig();
        common.setAppConfig(config.data);
    }, [apiServices.common, common]);

    const getUnreadNotify = useCallback(async () => {
        if (userManager.userInfo) {
            const res = await apiServices.notification?.getUnreadNotify() as any;
            if (res.success) {
                const data = res.data as NotificationTotalModel;
                common.setAppConfig({ ...common.appConfig, total_un_read: data?.total_unRead });
            }
        }
    }, [apiServices.notification, common, userManager.userInfo]);

    const onChangeMenu = useCallback((index: number) => {
        setStepIndex(index);
    }, []);

    const renderIconVerify = useMemo(() => {
        switch (userManager.userInfo?.tinh_trang?.color) {
            case COLOR_TRANSACTION.RED:
                return <img className={cx('ic_verify')} src={IcNoVerify} />;
            case COLOR_TRANSACTION.YELLOW:
                return <img className={cx('ic_verify')} src={IcNoVerify} />;
            case COLOR_TRANSACTION.GREEN:
                return <img className={cx('ic_verify')} src={IcTicked} />;
            default:
                return null;
        }
    }, [userManager.userInfo?.tinh_trang?.color]);

    const OperationsSlot: Record<PositionType, React.ReactNode> = useMemo(() => {

        const navigateToLogin = () => {
            navigate(Paths.auth, { state: { name: AUTH_STATE.LOGIN } });
        };

        const navigateToRegister = () => {
            navigate(Paths.auth, { state: { name: AUTH_STATE.REGISTER } });
        };

        const navigateToProfile = () => {
            setStepIndex(TAB_INDEX.PROFILE);
        };
        const navigateToNotification = () => {
            setStepIndex(TAB_INDEX.NOTIFICATION);
        };

        const navigateToIntro = () => {
            setStepIndex(TAB_INDEX.INTRO);
        };

        return {
            left: <div className={cx('header_left')}>
                <img src={IcLogo} className={cx('icon-tienngay')} onClick={navigateToIntro} />
            </div>,
            right: <div className={cx('header_right')} >
                {/* {!sessionManager.accessToken ? <> */}
                {!sessionManager.accessToken ? /*tắt đăng nhập cần pass*/
                    <div className={cx('header')}>
                        <Button
                            label={Languages.auth.login}
                            buttonStyle={BUTTON_STYLES.OUTLINE_GREEN}
                            isLowerCase
                            onPress={navigateToLogin}
                            containButtonStyles={'x10'}
                            width={100}
                        />
                        <Button
                            label={Languages.auth.register}
                            buttonStyle={BUTTON_STYLES.GREEN}
                            isLowerCase
                            onPress={navigateToRegister}
                            width={100}
                        />
                    </div>
                    :
                    <div className={cx('header')}>
                        <img src={IcNotification} className={cx('icon-menu')} onClick={navigateToNotification} />
                        <div className={cx('row center')}>
                            <div className={cx('avatar-container')}>
                                <img src={userManager.userInfo?.avatar_user || ImgNoAvatar} className={cx('img-avatar')} onClick={navigateToProfile} />
                                {renderIconVerify}
                            </div>
                            <span className={cx('text-full-name')}>{userManager.userInfo?.full_name}</span>
                            <img src={IcLogout} className={cx('icon-small')} onClick={onLogOut} />
                        </div>
                    </div>
                }
            </div>
        };
    }, [navigate, onLogOut, renderIconVerify, userManager.userInfo]);

    const slot = useMemo(() => {
        if (position.length === 0) return null;

        return position.reduce(
            (acc, direction) => ({ ...acc, [direction]: OperationsSlot[direction] }),
            {},
        );
    }, [OperationsSlot, position]);

    const getStepLayout = useCallback((index: number) => {
        switch (index) {
            case TAB_INDEX.INVESTMENT:
                return <InvestTab
                    numberTabs={numberTabsInvest}
                    receptionData={receptionData}
                    onResetNumberTabs={onResetNumberTabs} />;
            case TAB_INDEX.MANAGEMENT:
                return <Manage
                    isFocus={stepIndex === TAB_INDEX.MANAGEMENT}
                    defaultTabs={numberTabsManage}
                    params={receptionData} />;
            case TAB_INDEX.NEWS:
                return <News />;
            case TAB_INDEX.PROFILE:
                return <Profile numberTabs={numberTabsProfile} onResetNumberTabs={onResetNumberTabs} />;
            case TAB_INDEX.NOTIFICATION:
                return <Notification keyTabs={0} />;
            case TAB_INDEX.INTRO:
            default:
                return <Intro />;
        }
    }, [numberTabsInvest, numberTabsManage, numberTabsProfile, onResetNumberTabs, receptionData, stepIndex]);

    const tabs = useMemo(() => {
        return ([
            {
                label: Languages.tabs[0],
                key: `${TAB_INDEX.INTRO}`,
                children: getStepLayout(TAB_INDEX.INTRO)
            },
            {
                label: Languages.tabs[1],
                key: `${TAB_INDEX.INVESTMENT}`,
                children: getStepLayout(TAB_INDEX.INVESTMENT)
            },
            userManager.userInfo && {
                label: Languages.tabs[2],
                key: `${TAB_INDEX.MANAGEMENT}`,
                children: getStepLayout(TAB_INDEX.MANAGEMENT)
            },
            {
                label: Languages.tabs[3],
                key: `${TAB_INDEX.NEWS}`,
                children: getStepLayout(TAB_INDEX.NEWS)
            },
            userManager.userInfo && {
                label: Languages.tabs[4],
                key: `${TAB_INDEX.PROFILE}`,
                children: getStepLayout(TAB_INDEX.PROFILE)
            },
            userManager.userInfo && {
                label: Languages.tabs[5],
                key: `${TAB_INDEX.NOTIFICATION}`,
                children: getStepLayout(TAB_INDEX.NOTIFICATION)
            }
        ] as TabsModel[]);
    }, [getStepLayout, userManager.userInfo]);

    const updateUserInfo = useCallback(async () => {
        if (userManager.userInfo && stepIndex === TAB_INDEX.PROFILE) {
            const resInfoAcc = await apiServices.auth.getUserInfo();
            if (resInfoAcc.success) {
                const data = resInfoAcc?.data as UserInfoModel;
                userManager.updateUserInfo({
                    ...data
                });
            }
        }
    }, [apiServices.auth, userManager, stepIndex]);

    const onChangeTab = useCallback((key: string) => {
        setStepIndex(parseInt(key));
    }, []);

    const onShowMenu = useCallback(() => {
        refDrawer.current?.show();
    }, []);

    const onClosePopup = useCallback(() => {
        refPopupLogout.current?.hideModal();
    }, []);

    const onClearDataAndLogout = useCallback(() => {
        setStepIndex(0);
        userManager.updateUserInfo(undefined);
        sessionManager.logout();
        refPopupLogout.current?.hideModal();
        location.reload();
    }, [userManager]);

    const renderTabsWeb = useMemo(() => {
        return (
            <Tabs
                defaultActiveKey={'0'}
                activeKey={`${stepIndex}`}
                onChange={onChangeTab}
                items={tabs}
                tabBarExtraContent={slot}
                centered
                tabBarStyle={{ marginBottom: 0, padding: '0% 18%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                color={COLORS.GREEN}
                className={cx('tabs-web-container')}
                tabBarGutter={tabBarGutter}
            />
        );
    }, [onChangeTab, slot, stepIndex, tabBarGutter, tabs]);

    return (
        <>
            {isMobile
                ? <div className={cx('container')}>
                    <div className={cx('header')}>
                        <img src={IcLogo} className={cx('icon-tienngay')} />
                        <img src={IcMenu} className={cx('icon-menu')} onClick={onShowMenu} />
                    </div>
                    {getStepLayout(stepIndex)}
                    <MenuMobile ref={refDrawer} onChangeStep={onChangeMenu} data={TabsMenuHeader} numberTabs={stepIndex} onClose={onLogOut} />
                </div>
                : <>{renderTabsWeb}</> 
            }
            <PopupBaseCenterScreen
                ref={refPopupLogout}
                labelSuccess={Languages.common.agree}
                labelCancel={Languages.common.cancel}
                hasTwoButton
                onClose={onClosePopup}
                onSuccessPress={onClearDataAndLogout}
                icon={IcPopupAuth}
                hasCloseIc
                buttonLeftStyle={BUTTON_STYLES.GREEN}
                buttonRightStyle={BUTTON_STYLES.RED}
                title={Languages.home.logout}
            />
        </>
    );
});

export default Home;
