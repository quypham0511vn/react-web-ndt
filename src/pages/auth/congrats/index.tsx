import { LINKS } from 'api/constants';
import BgAuth from 'assets/image/bg_auth.jpg';
import ImgAppStore from 'assets/image/img_app_store.svg';
import ImgGooglePlay from 'assets/image/img_gg_chplay.svg';
import ImgLogo from 'assets/image/img_logo_white.svg';
import ImgQrCode from 'assets/image/img_qr.jpg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useEffect, useMemo } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'routers/paths';
import helper from 'utils/helper';
import styles from './.module.scss';

const cx = classNames.bind(styles);

export const Congrats = () => {
    const navigate = useNavigate();

    const openGooglePlay = useCallback(() => {
        helper.openLink(LINKS.STORE_ANDROID);
    }, []);

    const openAppStore = useCallback(() => {
        helper.openLinkOnIos(LINKS.STORE_IOS);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (isAndroid) {
                openGooglePlay();
            } else if (isIOS) {
                openAppStore();
            }else {
                navigate(Paths.home);
            }
        }, 3000);
    }, [navigate, openAppStore, openGooglePlay]);

    const backgroundImage = useMemo(() => {
        return BgAuth;
    }, []);

    const renderLeftBackground = useMemo(() => {
        return {
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        };
    }, [backgroundImage]);

    const renderLeftContent = useMemo(() => {
        return <div className={cx('left-container')}
            style={renderLeftBackground}>
            <img src={ImgLogo} className={cx('img-logo')} />
            <span className={cx('text-white medium h2 y40')}>
                {Languages.auth.congrats[0]}
            </span>
            <span className={cx('text-white medium h4 y15')}>
                {Languages.auth.congrats[1]}
            </span>
            <div className={cx('row y40')}>
                <div className={cx('column x50', 'jus-between')}>
                    <img src={ImgAppStore} className={cx('img-store')} onClick={openAppStore} />
                    <img src={ImgGooglePlay} className={cx('img-store', 'y40')} onClick={openGooglePlay} />
                </div>
                <img src={ImgQrCode} className={cx('img-qr')} />
            </div>
        </div>;
    }, [openAppStore, openGooglePlay, renderLeftBackground]);

    const renderView = useMemo(() => {
        return <div className={cx('root-container')}>
            {renderLeftContent}
        </div>;
    }, [renderLeftContent]);

    return renderView;
};

export default Congrats;
