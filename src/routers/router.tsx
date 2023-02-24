import { ConfigProvider } from 'antd';
import Header from 'components/header';
import UserSupportBubble from 'components/user-support-bubble';
import { useAppStore } from 'hooks';
import OverlayLoader from 'pages/common/overlay-loader';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { COLORS } from 'theme/colors';
import { publicRoutes, RouteProps } from './configs';

const RouteWrapper = ({ ...props }: RouteProps): ReactElement => {
    const navigate = useNavigate();
    const { userManager } = useAppStore();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate, props.needAuth, userManager.userInfo]);

    return (
        <Suspense fallback={<OverlayLoader />}>
            <div className={'body'}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: COLORS.GREEN,
                            lineWidth: 1
                        }
                    }}>
                    {props.hasHeader && <Header />}
                    {/* <div className={'content'}> */}
                    <props.page
                        {...props} />
                    {/* </div> */}
                    {props.hasSupport && <UserSupportBubble />}
                    {/* {props.hasFooter && <Footer />} */}
                </ConfigProvider>
            </div>
        </Suspense>
    );
};

const Router = () => {
    return (
        <Routes>
            {publicRoutes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={<RouteWrapper {...route} />}
                    />
                );
            })}
        </Routes>
    );
};
export default Router;
