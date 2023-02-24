import 'assets/scss/index.scss';
import 'assets/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import sessionManager from 'managers/session-manager';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AppStoreProvider } from './providers/app-provider';
import Router from './routers/router';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import config from 'config';
import { NotifyProvider } from 'providers/notify-provider';

if (config.env === 'prod') {
    console.log = () => { };
    console.error = () => { };
    console.debug = () => { };
}

const container = document.getElementById('root');

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
document.documentElement.style.setProperty('--vw', `${vw}px`);

function App(): JSX.Element {
    function handleWindowSizeChange() {
        sessionManager.isMobile = window.innerWidth <= 768;
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
    }

    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const router = createBrowserRouter([
        { path: '*', element: <Router /> }
    ]);

    useEffect(() => {
        router.subscribe((state) => console.log('new state', state));
    }, [router]);

    return <>
        {/* <React.StrictMode> */}
        <AppStoreProvider>
            <NotifyProvider>
                <RouterProvider router={router} />
            </NotifyProvider>
        </AppStoreProvider>
        <ToastContainer theme="colored" className="customize-toast" limit={3} />
        {/* </React.StrictMode> */}
    </>;
}
const root = createRoot(container!);
root.render(<App />);
