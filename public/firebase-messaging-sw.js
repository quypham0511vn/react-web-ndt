self.importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
self.importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');

self.addEventListener('fetch', () => {
    const urlParams = new URLSearchParams(location.search);
    self.firebaseConfig = Object.fromEntries(urlParams);
});

const firebaseConfig = {
    apiKey: 'AIzaSyDEhpio8NaSYClEi7kB8zj7mDuLqyqqIpQ',
    authDomain: 'vfc-ndt.firebaseapp.com',
    projectId: 'vfc-ndt',
    storageBucket: 'vfc-ndt.appspot.com',
    messagingSenderId: '393388576958',
    appId: '1:393388576958:web:8e1f168547bd790c52ceef',
    measurementId: 'G-FD90CY57FD'
};

self.firebase.initializeApp(self.firebaseConfig || firebaseConfig);
if (self.firebase.messaging.isSupported()) {
    const messaging = self.firebase.messaging();
    const channel = new BroadcastChannel('notifications-bg');
    messaging.onBackgroundMessage(function (payload) {
        channel.postMessage(payload);
    });
}
