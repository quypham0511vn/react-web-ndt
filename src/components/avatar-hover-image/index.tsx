import classNames from 'classnames/bind';
import React from 'react';
import styles from './avatar-hover-image.module.scss';
import ImgNoAvatar from 'assets/image/img_no_avatar.jpg';
import IcSpin from 'assets/image/ic_white_spin_image.svg';

const cx = classNames.bind(styles);

function AvatarHoverImage({ image, onPress }:
    {
        image?: string,
        onPress?: () => void,
    }
) {

    return (
        <div className={cx('container-image-edit')} onClick={onPress}>
            <img src={image || ImgNoAvatar} className={cx('image-avatar-user')} />
            <div className={cx('middle')}>
                <img className={cx('edit-container')} src={IcSpin} />
            </div>
        </div>
    );
}

export default AvatarHoverImage;
