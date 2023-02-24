import Spinner from 'components/spinner';
import React, { useCallback, useState } from 'react';
import LazyLoad from 'react-lazy-load';

function LazyImage({ src, className, width }:
    {
        src?: string,
        className?: string,
        width?: string,
        onPress?: () => void,
    }
) {
    const [loaded, setLoaded] = useState(false);
    const handleVisible = useCallback(() => setLoaded(true), []);

    return <>
        <LazyLoad onContentVisible={handleVisible}>
            <img src={src} width={width}
                className={className}
                style={{ objectFit: 'cover' }}
            />
        </LazyLoad>
        {!loaded && <Spinner/>}
    </>;
}

export default LazyImage;
