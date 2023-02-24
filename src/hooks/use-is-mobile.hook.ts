import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import sessionManager from 'managers/session-manager';

const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(sessionManager.isMobile || false);

    useLayoutEffect(() => {
        const updateSize = (): void => {
            setIsMobile(window.innerWidth < 1024);
        };

        updateSize();
        window.addEventListener('resize', debounce(updateSize, 250));

        return (): void => window.removeEventListener('resize', updateSize);
    }, []);

    return isMobile;
};

export default useIsMobile;
