import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React from 'react';
import styles from './search-bar.module.scss';
import IcFilter from 'assets/image/ic_green_small_filter.svg';

const cx = classNames.bind(styles);

function SearchBar({ title, onSearch, onCancel }:
    {
        title?: string, onSearch?: () => void, onCancel?: () => void,
    }
) {

    return (
        <div className={cx(title ? 'search-mobile-component' : 'no-title-search-mobile-component')}>
            {title && <span className={cx('text-title')}>{title}</span>}
            <div className={cx('right-search-component')} >
                <div className={cx('search-component')} onClick={onSearch}>
                    <span className={cx('search')}>{Languages.common.search}</span>
                    <img src={IcFilter} />
                </div>
                {onCancel && <span onClick={onCancel} className={cx('cancel')}>{Languages.common.filterCancel}</span>}
            </div>
        </div>
    );
}

export default SearchBar;
