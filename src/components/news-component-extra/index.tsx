import React from 'react';
import classNames from 'classnames/bind';
import styles from './.module.scss';
import { NewsModel } from 'models/news';
import dateUtils from 'utils/date-utils';
import LazyImage from 'components/image';

const cx = classNames.bind(styles);

export type linkProps = {
    dataLink: NewsModel[]
    styleContainer?: string;
    styleContent?: string;
    styleImg?: string;
    styleDate?: string;
    styleRow?: string;
    isMobile?: boolean;
    onClick: (item: NewsModel) => void;
}

export const NewsExtraComponent = ({ dataLink, isMobile, onClick }: linkProps) => {
    const styleContainer = cx('news-horizontal-container');
    const styleRow = cx('news-horizontal', 'shadow');
    const styleImg = cx('news-horizontal-img');

    return (
        <div className={styleContainer}>
            {dataLink?.map((item: NewsModel, index: number) => {
                return (
                    <a className={styleRow} key={index}
                        onClick={() => onClick(item)}>
                        <div className={cx('news-horizontal-img', 'center')}>
                            <LazyImage src={item.image} className={styleImg} />
                        </div>
                        <div className={cx('column y10 x10')}>
                            <span className={cx(`${'xl10 h7 text-black1 text-preview'}`)}>{item.title_vi}</span>
                            {!isMobile && <span className={cx('xl10 h8 text-gray text-preview-des y10 b10')}>{item.summary_vi}</span>}
                            <span className={cx('xl10 h8 text-gray y5 b5')}>{dateUtils.getDateFormat(item.created_at)}</span>
                        </div>
                    </a>
                );
            })}
        </div>
    );
};
