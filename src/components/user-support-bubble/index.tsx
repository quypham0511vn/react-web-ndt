import classNames from 'classnames/bind';
import React, { useCallback, useMemo, useState } from 'react';
import styles from './user-support-bubble.module.scss';
import IcSupport from 'assets/icon/ic_message_support.svg';
import IcCancel from 'assets/icon/ic_white_radius_button_cancel.svg';

import { MenuSupport } from 'assets/static-data/profile';

const cx = classNames.bind(styles);

type SupportModel = {
    id: number,
    title: string,
    icon: any,
    link: string
}

const UserSupportBubble = () => {
    const [hide, setHide] = useState<boolean>(true);

    const onChangeState = useCallback(() => {
        setHide(last => !last);
    }, []);

    const onHide = useCallback(() => {
        setHide(true);
    }, []);

    const onDisplay = useCallback(() => {
        setHide(false);
    }, []);

    const renderChatItem = useCallback((icon: any, key: number, link: string) => {
        return (
            <a href={link} className={cx('icon-item-container')} key={key}>
                <img className={cx('icon-chat')} src={icon} />
            </a>
        );
    }, []);

    const renderSupport = useMemo(() => {
        return (
            <div className={cx(hide ? 'social-button-hide' : 'social-button')}>
                {MenuSupport.map((itemMenu: SupportModel) => {
                    return renderChatItem(itemMenu.icon, itemMenu.id, itemMenu?.link);

                })}
            </div>
        );
    }, [hide, renderChatItem]);

    return (
        <div
            className={cx('support-button-container')}
        // onMouseLeave={onHide}
        // onMouseMove={onDisplay}
        >
            {renderSupport}
            <div className={cx('icon-item-support-container')} onClick={onChangeState}>
                {hide &&
                    <>
                        <div className={cx('chat-animate-wave1')} />
                        <div className={cx('chat-animate-wave2')} />
                    </>}
                <img className={cx(hide ? 'icon-support-chat' : 'icon-support-chat-cancel')} src={!hide ? IcCancel : IcSupport} />
            </div>
        </div>

    );
};

export default UserSupportBubble;
