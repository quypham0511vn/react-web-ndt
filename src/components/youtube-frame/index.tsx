import classNames from 'classnames/bind';
import React, { useRef } from 'react';
import styles from './youtube-frame.module.scss';
import IcPlayVideo from 'assets/icon/ic_white_play_video.svg';

const cx = classNames.bind(styles);

function YouTubeFrame({ videoLink, width, height, poster, radius }: {
    videoLink: string,
    width?: string,
    height?: string,
    poster?: any,
    radius?: string
}) {
    const divRef = useRef<HTMLDivElement>(null);

    const onPlay = () => {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '1');
        iframe.setAttribute(
            'allow',
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        );
        iframe.style.width = width ? width : '100%';
        iframe.style.height = height ? height : '100%';
        iframe.style.minHeight = '400px';
        iframe.style.borderRadius = radius ? radius : '16px';
        iframe.setAttribute('src', `${videoLink}`);
        if (divRef.current) {
            divRef.current.innerHTML = '';
            divRef.current.appendChild(iframe);
        }
    };

    return (
        <div ref={divRef} className={cx('container-image-edit')}>
            <div className={cx('container-image-edit')} onClick={onPlay}>
                <img src={poster} className={cx('image-avatar-user')}/>
                <div className={cx('middle')}>
                    <img className={cx('edit-container')} src={IcPlayVideo} />
                </div>
            </div>
        </div>
    );
}


export default YouTubeFrame;
