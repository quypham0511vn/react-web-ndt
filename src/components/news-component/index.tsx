import React from 'react';
import classNames from 'classnames/bind';
import styles from './.module.scss';
import { Col, Row } from 'antd';
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
    onClick: (item: NewsModel) => void;
}

export const NewsComponent = ({ dataLink, styleContainer, styleContent, styleImg, styleDate, styleRow, onClick }: linkProps) => {
    return (
        <div className={styleContainer}>
            {dataLink?.map((item: NewsModel, index: number) => {
                return (
                    <a key={index} rel={item.link} type="text/css" className={styleRow}
                        onClick={() => onClick(item)}>
                        <Row gutter={[24, 16]} className={styleRow || cx('row y15')} >
                            <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('center', 'img')}>
                                <LazyImage src={item.image} className={styleImg || cx('img', 'center')} />
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12} className={cx('column')}>
                                <span className={cx(`${styleContent || 'xl10h7 text-black1 text-preview'}`)}>{item.title_vi}</span>
                                <span className={styleDate || cx('xl10h8 text-gray y5 b5')}>{dateUtils.getDateFormat(item.created_at)}</span>
                            </Col>
                        </Row>
                    </a>
                );
            })}
        </div>
    );
};
