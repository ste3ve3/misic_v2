import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    children: [
        {
            path: '/login',
            element: <AuthLogin3 />
        }
    ]
};

export default AuthenticationRoutes;
