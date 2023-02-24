import ImgNoData from 'assets/image/img_no_data.png';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './no-data.module.scss';

const cx = classNames.bind(styles);

function NoData({ description }:
    {
        description: string
    }
) {
    return (
        <div className={cx('container')}>
            <img src={ImgNoData} className={cx('image')} />

            <span className={cx('h6 text-black')}>{description}</span>
        </div>
    );
}

export default NoData;
