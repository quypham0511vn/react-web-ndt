import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './intro.module.scss';

const cx = classNames.bind(styles);
function Count(props) {
    const { label, number, duration } = props.item;
    const [count, setCount] = useState('0');

    const runCount = useCallback(() => {
        let start = 0;
        const end = parseInt(`${number}`.substring(0, 3));
        if (start === end) return;
        let totalMilSecDur = parseInt(duration);
        let incrementTime = (totalMilSecDur / end) * 10000;

        let timer = setInterval(() => {
            start += 1;
            setCount(String(start) + `${number}`.substring(3));
            if (start === end) {
                clearInterval(timer);
            }
        }, incrementTime);
    }, [duration, number]);


    useEffect(() => {
        if (props.visible) {
            runCount();
        }
    }, [props.visible, runCount]);

    return (
        <div id={cx('count-container')}>
            <span className={cx('text-white h1')}>{count}</span>
            <span className={cx('text-white h3 y5')}>{label}</span>
        </div>
    );
}

export default Count;
