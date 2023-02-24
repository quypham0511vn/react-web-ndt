import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { observer } from 'mobx-react';
import { ItemDocument } from 'models/profile';
import { documentInfoApp } from 'assets/static-data/profile';
import React, { useCallback } from 'react';
import styles from './user-manual.module.scss';

const cx = classNames.bind(styles);

const UserManual = observer(() => {

    const render = useCallback((string: string, isBold: boolean) => {
        const newString = string.split('/n');
        return newString.map((item, index) => (<span className={cx('text-gray h6', isBold ? 'bold' : '')} key={index}>{item}</span>));
    }, []);

    const renderViewItalicized = useCallback((item: ItemDocument) => {
        return (
            <span className={cx('text-gray h6 font-style-italic')}>
                {item.content}
            </span>
        );
    }, []);

    const renderViewNormal = useCallback((item: ItemDocument) => {
        return (
            <span className={cx('text-gray h6')}>
                {item.content}
            </span>
        );
    }, []);

    const renderViewBold = useCallback((item: ItemDocument) => {
        return (
            <div className={cx('view-txt-bold', 'column')}  >
                {render(item.content, true)}
            </div>
        );
    }, [render]);

    const renderViewOther = useCallback((item: ItemDocument) => {
        return (
            <span className={cx('text-gray bold h6')}>
                {item.label}
                <span className={cx('h6 text-gray')}>{item.content}</span>
            </span>
        );
    }, []);

    const renderWordBreak = useCallback((item: ItemDocument) => {
        return (
            <div className={cx('column')}  >
                {render(item.content, false)}
            </div>
        );
    }, [render]);

    const renderItem = useCallback((item: ItemDocument) => {
        switch (item?.style) {
            case 0:
                return renderViewItalicized(item);
            case 1:
                return renderViewNormal(item);
            case 2:
                return renderViewBold(item);
            case 3:
                return renderViewOther(item);
            default:
                return renderWordBreak(item);
        }
    }, [renderViewBold, renderViewItalicized, renderViewNormal, renderViewOther, renderWordBreak]);

    return (
        <div className={cx('page', 'padding', 'column')}>
            <span className={cx('text-gray h5 bold')}>{Languages.profile.userManual}</span>
            {documentInfoApp.map((item: ItemDocument, index: number) => {
                return (
                    <div className={cx('column y20')} key={index}>
                        {renderItem(item)}
                    </div>
                );
            })}
        </div>
    );
});

export default UserManual;
