import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { useCallback, useMemo } from 'react';
import styles from './question-answer.module.scss';

const cx = classNames.bind(styles);

const QuestionAnswer = () => {

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

    const renderArticle5 = useMemo(() => {
        return (
            <div className={cx('item-title-header')}>
                <span className={cx('text-big-header')}>{Languages.questionAnswer.bigHeader[4]}</span>
                <span className={cx('text-sub-title5')}>{Languages.questionAnswer.subTitleQA.article5.title}</span>
                <ul>
                    {Languages.questionAnswer.subTitleQA.article5.subTitle.map((item: string, index: number) => {
                        return <li key={index} className={cx(index + 1 === Languages.questionAnswer.subTitleQA.article5.subTitle.length
                            ? 'text-sub-title5-last'
                            : 'text-sub-title5-li'
                        )}>{item}</li>;
                    })}
                </ul>
            </div>
        );
    }, []);

    return (
        <div className={cx('page')}>
            <div className={cx('page-content', 'padding-in-profile')}>
                <span className={cx('title-header')}>{Languages.questionAnswer.titlePage}</span>
                {renderArticle(Languages.questionAnswer.bigHeader[0], Languages.questionAnswer.subTitleQA.article1)}
                {renderArticle(Languages.questionAnswer.bigHeader[1], Languages.questionAnswer.subTitleQA.article2)}
                {renderArticle(Languages.questionAnswer.bigHeader[2], Languages.questionAnswer.subTitleQA.article3)}
                {renderArticle(Languages.questionAnswer.bigHeader[3], Languages.questionAnswer.subTitleQA.article4)}
                {renderArticle5}
                {renderArticle(Languages.questionAnswer.bigHeader[5], Languages.questionAnswer.subTitleQA.article6)}
                {renderArticle(Languages.questionAnswer.bigHeader[6], Languages.questionAnswer.subTitleQA.article7)}
                {renderArticle(Languages.questionAnswer.bigHeader[7], Languages.questionAnswer.subTitleQA.article8)}
                {renderArticle(Languages.questionAnswer.bigHeader[8], Languages.questionAnswer.subTitleQA.article9)}
            </div>
        </div>
    );
};

export default QuestionAnswer;
