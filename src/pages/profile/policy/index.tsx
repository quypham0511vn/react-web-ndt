import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useMemo } from 'react';
import styles from './policy.module.scss';

const cx = classNames.bind(styles);

const Policy = ({ isInLink }: { isInLink?: boolean }) => {

    const renderArticle = useCallback((label: string, arr: Array<string>) => {
        return (
            <div className={cx('item-title-header')}>
                <span className={cx('text-big-header')}>{label}</span>
                {arr.map((item: string, index: number) => {
                    return (
                        <span key={index} className={cx('text-sub-title')}>{item}</span>
                    );
                })}
            </div>
        );
    }, []);

    const renderArticle3 = useMemo(() => {
        return (
            <div className={cx('item-title-header')}>
                <span className={cx('text-big-header')}>{Languages.policy.bigHeader[2]}</span>
                {Languages.policy.subTitlePolicy.article3.map((item: string | any, index: number) => {
                    if (typeof item === 'string') {
                        return <span key={index} className={cx('text-sub-title')}>{item}</span>;
                    } else {
                        return (
                            <div key={index}>
                                <span className={cx('text-sub-title-ul')}>{item?.title}</span>
                                <ul>
                                    {item.subTitle.map((child: string, indexChild: number) => {
                                        return <li key={indexChild} className={cx('text-sub-title-li')}>{child}</li>;
                                    })}
                                </ul>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }, []);

    const renderArticle4 = useMemo(() => {
        return (
            <div className={cx('item-title-header')}>
                <span className={cx('text-big-header')}>{Languages.policy.bigHeader[3]}</span>
                <span className={cx('text-sub-title4')}>{Languages.policy.subTitlePolicy.article4.title}</span>
                <ul>
                    {Languages.policy.subTitlePolicy.article4.subTitle.map((item: string, index: number) => {
                        return <li key={index} className={cx(index + 1 === Languages.policy.subTitlePolicy.article4.subTitle.length
                            ? 'text-sub-title4-last'
                            : 'text-sub-title4-li'
                        )}>{item}</li>;
                    })}
                </ul>
            </div>
        );
    }, []);

    return (
        <div className={cx('page')}>
            <div className={cx('page-content', !isInLink ? 'padding' : 'padding-in-profile')}>
                <span className={cx('title-header')}>{Languages.policy.titlePolicy}</span>
                <span className={cx('describe-header', 'y10')}>{Languages.policy.describePolicy}</span>
                {renderArticle(Languages.policy.bigHeader[0], Languages.policy.subTitlePolicy.article1)}
                {renderArticle(Languages.policy.bigHeader[1], Languages.policy.subTitlePolicy.article2)}
                {renderArticle3}
                {renderArticle4}
                {renderArticle(Languages.policy.bigHeader[4], Languages.policy.subTitlePolicy.article5)}
                {renderArticle(Languages.policy.bigHeader[5], Languages.policy.subTitlePolicy.article6)}
            </div>
        </div>
    );
};

export default Policy;
