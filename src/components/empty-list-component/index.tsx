import React from 'react';
import { observer } from 'mobx-react';

import IcEmpty from '../../assets/image/ic_empty_data.svg';
import Languages from 'commons/languages';
import classNames from 'classnames/bind';
import style from './empty-list-component.module.scss';

const cx = classNames.bind(style);

const EmptyListComponent = observer(({ img, description }: { img?: any, description?: string }) => (
    <div className={cx('empty-container')}>
        {<img src={img || IcEmpty} />}
        <span className={cx('description')}>{description || Languages.errorMsg.emptyList}</span>
    </div>
));

export default EmptyListComponent;
