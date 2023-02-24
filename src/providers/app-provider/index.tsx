import sessionManager from 'managers/session-manager';
import React, { useEffect, useState } from 'react';

import AppStore from './app-store';
import { AppStoreContext } from './context';

export const AppStoreProvider = ({ children }: any) => {

    const [appStore, setAppStore] = useState<any>(null);

    useEffect(() => {
        sessionManager.initData();
        setAppStore(new AppStore());
    }, []);

    return (
        appStore && <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};
