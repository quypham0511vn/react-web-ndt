import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export const useWindowScrollPositions = (classNames: any) => {

    const [scrollPosition, setPosition] = useState({ scrollX: 0, scrollY: 0, scrollTop: 0 });

    useLayoutEffect(() => {
        const container = document.getElementsByClassName(classNames);
        const updatePositionScroll = (): void => {
            setPosition({ scrollX: container[0].scrollWidth, scrollY: container[0].scrollHeight, scrollTop: container[0].scrollTop });
        };

        updatePositionScroll();
        container[0].addEventListener('scroll', debounce(updatePositionScroll, 250));

        return (): void => container[0].removeEventListener('scroll', updatePositionScroll);
    }, [classNames]);

    return scrollPosition;
};
