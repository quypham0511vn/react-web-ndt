
import { Drawer } from 'antd';
import Ic_Close from 'assets/image/ic_black_close_popup.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import IcLogo from 'assets/image/img_logo.jpeg';

import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState
} from 'react';
import styles from './menu-mobile.module.scss';
import { ItemScreenModel } from 'models/profile';
import { Button } from 'components/button';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
import { DrawerBaseActions } from 'components/drawer-mobile-account';
import { BUTTON_STYLES } from 'components/button/types';
import sessionManager from 'managers/session-manager';
import { AUTH_STATE } from 'commons/constants';

type DrawerBaseProps = {
    onClose?: () => any;
    onChangeStep?: (tabs: number) => void;
    onBackdropPress?: () => void;
    data: ItemScreenModel[],
    numberTabs: number;
};

const cx = classNames.bind(styles);

const MenuMobile = forwardRef<DrawerBaseActions, DrawerBaseProps>(
    ({ onChangeStep, onClose, onBackdropPress, data, numberTabs
    }: DrawerBaseProps, ref) => {
        const [visible, setVisible] = useState(false);
        const navigate = useNavigate();

        const [tabs, setTabs] = useState<number>(0);

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

        const onBackDrop = useCallback(() => {
            setVisible(false);
            onBackdropPress?.();
        }, [onBackdropPress]);

        const onLogout = useCallback(() => {
            onClose?.();
        }, [onClose]);


        const renderTokenView = useMemo(() => {

            const navigateToLogin = () => {
                navigate(Paths.auth, { state: { name: AUTH_STATE.LOGIN } });
            };

            const navigateToRegister = () => {
                navigate(Paths.auth, { state: { name: AUTH_STATE.REGISTER } });
            };

            return (
                <>
                    {sessionManager.accessToken
                        ? <div className={cx('row')}>
                            <Button
                                label={Languages.profile.logout}
                                labelStyles={cx('text-red h6 medium')}
                                containButtonStyles={cx('button-gray', 'y20')}
                                buttonStyle={BUTTON_STYLES.GRAY}
                                isLowerCase
                                onPress={onLogout}
                            />
                        </div>
                        : <div className={cx('column')}>
                            <Button
                                label={Languages.auth.login}
                                containButtonStyles={cx('button-white', 'y30')}
                                labelStyles={cx('text-green h6 medium')}
                                buttonStyle={BUTTON_STYLES.WHITE}
                                isLowerCase
                                onPress={navigateToLogin}
                            />
                            <Button
                                label={Languages.auth.signUp}
                                labelStyles={cx('text-white h6 medium')}
                                containButtonStyles={cx('button-green', 'y20')}
                                buttonStyle={BUTTON_STYLES.GREEN}
                                isLowerCase
                                onPress={navigateToRegister}
                            />
                        </div>
                    }
                </>
            );
        }, [navigate, onLogout]);

        const renderCustom = useCallback(() => {
            return (
                <div className={cx('container', 'y20')}>
                    {data?.map((item: ItemScreenModel, index: number) => {
                        const handleChangeStep = () => {
                            onChangeStep?.(index || 0);
                            setTabs(index);
                            setVisible(false);
                        };
                        return (
                            <div key={item?.id}>
                                {item.is_login
                                    ? (sessionManager.accessToken &&
                                        <div className={tabs === index ? cx('column-active') : cx('column')}
                                            onClick={tabs !== index ? handleChangeStep : undefined}>
                                            <div className={cx('button-item-container')}>
                                                <img src={item?.icon} className={cx('icon-close')} />
                                                <span className={cx('title-item-text', 'text-black h5')}>{item?.title}</span>
                                            </div>
                                        </div>
                                    )
                                    : <div className={tabs === index ? cx('column-active') : cx('column')}
                                        onClick={tabs !== index ? handleChangeStep : undefined}>
                                        <div className={cx('button-item-container')}>
                                            <img src={item?.icon} />
                                            <span className={cx('title-item-text', 'text-black h5')}>{item?.title}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    })}
                    {renderTokenView}
                </div>
            );
        }, [data, onChangeStep, renderTokenView, tabs]);

        return (
            <Drawer
                placement={'left'}
                closable={false}
                onClose={onBackDrop}
                open={visible}
                contentWrapperStyle={{ width: '100%' }}
            >
                <div className={cx('drawer-container')}>
                    <img src={IcLogo} className={cx('logo')} />
                    <img src={Ic_Close} onClick={hide} className={cx('close')} />
                </div>
                <div className={cx('body')}>
                    {renderCustom()}
                </div>
            </Drawer>
        );
    }
);

export default MenuMobile;

