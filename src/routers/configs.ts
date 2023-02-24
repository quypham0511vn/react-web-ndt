// Layouts

// Pages
import { AUTH_STATE } from 'commons/constants';
import Auth from 'pages/auth';
import Congrats from 'pages/auth/congrats';
import NotFound from 'pages/common/not-found';
import Home from 'pages/home';
import Policy from 'pages/profile/policy';
import Recruit from 'pages/recruit';
import { Paths } from './paths';
export interface RouteProps {
    path: string;
    page: (props: any) => JSX.Element;
    hasHeader?: boolean;
    hasFooter?: boolean;
    needAuth?: boolean;
    hasSupport?: boolean;
    data?: any
}

// Public routes
const publicRoutes = [
    //common
    { path: Paths.home, page: Home, hasHeader: true, hasFooter: true, hasSupport: true },
    { path: Paths.any, page: NotFound },

    //auth
    { path: Paths.auth, page: Auth, hasHeader: true },
    { path: Paths.register, page: Auth, data: AUTH_STATE.REGISTER, hasHeader: true },
    { path: Paths.congrats, page: Congrats},

    // more
    { path: Paths.policy, page: Policy },
    { path: Paths.recruit, page: Recruit }
] as RouteProps[];

const privateRoutes = [];

export {
    publicRoutes,
    privateRoutes
};
