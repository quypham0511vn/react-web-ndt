import { useAppStore } from 'hooks';
import sessionManager from 'managers/session-manager';
import { observer, useLocalObservable } from 'mobx-react';
import { NotifyModel } from 'models/notify';
import React, { useEffect } from 'react';
import { onMessageListener, requestFcmToken } from 'utils/firebase-helper';
import toasty from 'utils/toasty';
import { NotifyContext } from './context';

export const NotifyProvider = observer(({ children }: any) => {
    const storeLocal = useLocalObservable(() => ({}));
    const { userManager, apiServices } = useAppStore();

    const reverseData = (payload: NotifyModel) => {
        if (payload?.notification) {
            const notificationOptions = {
                body: payload.notification.body,
                icon: payload.notification.icon
            };

            if (!('Notification' in window)) {
                toasty.notify(payload.notification.title);
            } else if (Notification.permission === 'granted') {
                var notification = new Notification(payload.notification.title, notificationOptions);
                notification.onclick = function (event) {
                    event.preventDefault();
                    window.open(payload.fcmOptions.link, '_blank');
                    notification.close();
                };
            }
        }
    };

    useEffect(() => {
        if (!sessionManager.accessToken) {
            requestFcmToken().then(token => {
                if (token) {
                    apiServices.common.collectDevice(token as string, 3);
                    onMessageListener();
                }
            });
        }
    }, []);

    useEffect(() => {
        if (userManager.userInfo?.phone_number) {
            requestFcmToken().then(token => {
                if (token) {
                    apiServices.notification.createFcmToken(token as string);
                }
            });
            const channelBackground = new BroadcastChannel('notifications-bg');
            const channelForeground = new BroadcastChannel('notifications-fg');

            const onBgMsg = (event) => {
                console.log('Receive background: ', event.data);
                reverseData(event.data);
            };

            const onFgMsg = (event) => {
                console.log('Receive foreground: ', event.data);
                reverseData(event.data);
            };

            channelBackground.addEventListener('message', onBgMsg);
            channelForeground.addEventListener('message', onFgMsg);

            return () => {
                channelBackground.removeEventListener('message', onBgMsg);
                channelForeground.removeEventListener('message', onFgMsg);
            };
        }
    }, [userManager.userInfo?.phone_number]);

    return (<>
        <NotifyContext.Provider value={storeLocal}>
            {children}
        </NotifyContext.Provider>
    </>
    );
});
