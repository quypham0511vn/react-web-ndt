import config from 'config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export const firebaseConfig = {
    apiKey: 'AIzaSyDEhpio8NaSYClEi7kB8zj7mDuLqyqqIpQ',
    authDomain: 'vfc-ndt.firebaseapp.com',
    projectId: 'vfc-ndt',
    storageBucket: 'vfc-ndt.appspot.com',
    messagingSenderId: '393388576958',
    appId: '1:393388576958:web:8e1f168547bd790c52ceef',
    measurementId: 'G-FD90CY57FD'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authGoogle = getAuth(app);

const messaging = getMessaging(app);
export default { authGoogle, messaging };

export const requestFcmToken = () => new Promise((resolve) => {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('./firebase-messaging-sw.js')
                    .then(function (registration) {
                        console.log('Registration successful, scope is:', registration.scope);
                        getToken(messaging, { vapidKey: config.fcmVapidKey, serviceWorkerRegistration: registration })
                            .then((currentToken) => {
                                resolve(currentToken);
                            }).catch((err) => {
                                console.log('An error occurred while retrieving token. ', err);
                                // catch error while creating client token
                            });
                    })
                    .catch(function (err) {
                        console.log('Service worker registration failed, error:', err);
                    });
            }
        } else {
            console.log('Do not have permission!');
        }
    });
});

export const onMessageListener = () => {
    const channel = new BroadcastChannel('notifications-fg');
    onMessage(messaging, (payload) => {
        channel.postMessage(payload);
    });
};
