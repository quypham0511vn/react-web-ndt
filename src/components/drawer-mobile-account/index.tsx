
import { Drawer } from 'antd';
import Ic_Close from 'assets/image/ic_black_close_popup.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';

import { UserInfoModel } from 'models/user-model';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState
} from 'react';
import styles from './drawer-mobile-account.module.scss';
import { ItemScreenModel } from 'models/profile';
import { useAppStore } from 'hooks';
import { STATE_IDENTITY } from 'commons/constants';
import AvatarHoverImage from 'components/avatar-hover-image';

type DrawerBaseProps = {
    onPressAvatar?: () => any;
    onChangeStep?: (tabs: number) => void;
    onBackdropPress?: () => void;
    onPressStatus?: () => void;
    data: ItemScreenModel[],
    numberTabs: number
};

export type DrawerBaseActions = {
    show: () => void;
    hide: () => void;
};

const cx = classNames.bind(styles);

const DrawerMobileAccount = forwardRef<DrawerBaseActions, DrawerBaseProps>(
    ({ onChangeStep, onPressAvatar, onBackdropPress, onPressStatus, data, numberTabs
    }: DrawerBaseProps, ref) => {
        const [visible, setVisible] = useState(false);
        const [info, setInfo] = useState<UserInfoModel>();
        const { userManager } = useAppStore();
        const [tabs, setTabs] = useState<number>(numberTabs);

        useEffect(() => {
            setInfo(userManager.userInfo);
        }, [userManager.userInfo]);

        useEffect(() => {
            setTabs(numberTabs);
        }, [numberTabs]);

        const hide = useCallback(() => {
            setVisible(false);
        }, []);

        const show = useCallback(() => {
            setVisible(true);
        }, []);

        useImperativeHandle(ref, () => ({
            show,
            hide
        }));

        const handlePressStatus = useCallback(() => {
            onPressStatus?.();
            setVisible(false);
            setTabs(0);
        }, [onPressStatus]);

        const onBackDrop = useCallback(() => {
            setVisible(false);
            onBackdropPress?.();
        }, [onBackdropPress]);

        const handleAvatar = useCallback(() => {
            onPressAvatar?.();
        }, [onPressAvatar]);

        const renderStatusAcc = useMemo(() => {
            switch (info?.tinh_trang?.auth) {
                case STATE_IDENTITY.UN_VERIFIED:
                    return (
                        <div className={cx('un-verify-container', 'hover-component')} onClick={handlePressStatus}>
                            <span className={cx('un-verify-text')} >{info?.tinh_trang?.status}</span>
                        </div>
                    );
                case STATE_IDENTITY.VERIFIED:
                    return (
                        <div className={cx('verify-container', 'hover-component')} onClick={handlePressStatus}>
                            <span className={cx('verify-text')} >{info?.tinh_trang?.status}</span>
                        </div>
                    );
                case STATE_IDENTITY.WAIT:
                    return (
                        <div className={cx('wait-verify-container', 'hover-component')} onClick={handlePressStatus}>
                            <span className={cx('wait-verify-text')} >{info?.tinh_trang?.status}</span>
                        </div>
                    );
                default:
                    return (
                        <div className={cx('un-verify-container', 'hover-component')} onClick={handlePressStatus}>
                            <span className={cx('un-verify-text')} >{info?.tinh_trang?.status}</span>
                        </div>
                    );
            }
        }, [info?.tinh_trang?.auth, info?.tinh_trang?.status, handlePressStatus]);

        const renderCustomView = useCallback(() => {

            return (
                <div className={cx('container')}>
                    <div className={cx('drawer-container')}>
                        <span className={cx('title-drawer-container')}>{Languages.profile.titleDrawerAccount}</span>
                        <img src={Ic_Close} onClick={hide} className={cx('close')} />
                    </div>
                    <div className={cx('avatar')}>
                        <AvatarHoverImage image={info?.avatar_user} onPress={handleAvatar} />
                        <span className={cx('user-name-text')}>{info?.full_name}</span>
                        {renderStatusAcc}
                    </div>

                    {data?.map((item: ItemScreenModel) => {
                        const handleChangeStep = () => {
                            onChangeStep?.(item?.id);
                            setTabs(item?.id);
                            setVisible(false);
                        };

                        return (
                            <div className={tabs === 0 ? cx('column') : (tabs === item?.id ? cx('column-active') : cx('column'))}
                                key={item?.id}
                                onClick={handleChangeStep}>
                                <div className={cx('button-item-container')}>
                                    <img src={item?.icon} />
                                    <span className={cx('title-item-text')}>{item?.title}</span>
                                </div>
                                <div className={cx('line')}></div>
                            </div>
                        );
                    })}
                </div>
            );
        }, [data, handleAvatar, hide, info?.avatar_user, info?.full_name, onChangeStep, renderStatusAcc, tabs]);

        return (
            <Drawer
                placement={'left'}
                closable={false}
                onClose={onBackDrop}
                open={visible}
                contentWrapperStyle={{ width: '80%' }}
            >
                {renderCustomView()}
            </Drawer>
        );
    }
);

export default DrawerMobileAccount;

