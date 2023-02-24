import classNames from 'classnames';
import Spinner from 'components/spinner';
import React, { useEffect, useState } from 'react';
import styles from './my-iframe.module.scss';

export const MyIFrame = ({ src, className, onCallback }:
    {
        src: string,
        className: string,
        onCallback: (data: any) => void
    }
) => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const cx = classNames.bind(styles);

    useEffect(() => {
        const handler = event => {
            onCallback(event?.data);
        };

        window.addEventListener('message', handler);

        return () => window.removeEventListener('message', handler);
    }, []);

    return <>
        {isLoading && <Spinner className={cx('spinner')} />}
        <iframe
            className={className}
            src={src}
            onLoad={(i) => setLoading(!i)}
        />
    </>;
};

