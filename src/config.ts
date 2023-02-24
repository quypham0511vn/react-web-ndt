const config = {
    baseURL: process.env['REACT_APP_BASE_URL'] || '',
    errorURL: process.env['REACT_APP_ERROR_URL'] || '',
    env: process.env['REACT_APP_ENV'] || 'dev',
    fcmVapidKey: process.env['REACT_APP_FIREBASE_FCM_VAPID_KEY'] || ''
} as const;

export default config;
