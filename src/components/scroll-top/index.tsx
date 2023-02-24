import classNames from 'classnames/bind';
import React, { useCallback } from 'react';
import styles from './scroll-top.module.scss';
import IcUpTop from 'assets/icon/ic_green_arrow_up.svg';
import { useWindowScrollPositions } from 'hooks/use-position-scroll';

const cx = classNames.bind(styles);

const ScrollTopComponent = ({ scrollTopHeight, onScrollTop, nameClassScroll }:
    {
        scrollTopHeight?: number,
        onScrollTop?: () => void,
        nameClassScroll: string
    }
) => {
    const { scrollTop } = useWindowScrollPositions(nameClassScroll);

    const handleScrollTop = useCallback(() => {
        onScrollTop?.();
        document.getElementsByClassName(nameClassScroll)[0].scrollTo({ behavior: 'smooth', top: 0 });
    }, [nameClassScroll, onScrollTop]);

    return (
        <div className={cx((scrollTopHeight ? scrollTopHeight : scrollTop) < 300 ? 'top-button-hide' : 'top-button')}
            onClick={handleScrollTop}>
            <img src={IcUpTop} />
        </div>
    );
};

export default ScrollTopComponent;
