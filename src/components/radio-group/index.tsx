import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './radio-group.module.scss';
import { observer } from 'mobx-react';
import { ItemRadioModel } from 'models/common';

const cx = classNames.bind(styles);

const RadioGroup = observer(({ data, label, onPress, defaultValue }: { data: ItemRadioModel[], label: string, onPress: any, defaultValue: string }) => {

    const [value, setValue] = useState<string>(defaultValue);

    return (
        <div className={cx('container')}>
            <div className={cx('column')}>
                <span className={cx('text-gray h7 y15')}>{label}</span>
                <div className={'row'}>
                    {data.map((item: ItemRadioModel, index: number) => {

                        const onChoose = () => {
                            setValue(item?.value);
                            onPress?.(item);
                        };

                        return (
                            <div key={index} className={'row center x15'} onClick={onChoose}>
                                <div className={cx('radio', 'x5 y10')} >
                                    <div className={cx(item.value === value ? 'radio-active' : 'radio-no-active')} />
                                </div>
                                <span className={cx('text-gray h7 y10')}>{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

export default RadioGroup;



