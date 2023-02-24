const { firebaseConfig } = require('utils/firebase-helper');

if ('serviceWorker' in navigator) {
    const firebaseConfigParams = new URLSearchParams(firebaseConfig).toString();
    navigator.serviceWorker
        .register(`../firebase-messaging-sw.js?${firebaseConfigParams}`)
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (err) {
            console.log('Service worker registration failed, error:', err);
        });
}
