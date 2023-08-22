import Login3 from 'views/pages/authentication/authentication3/Login3';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    children: [
        {
            path: '/template',
            element: <Login3 />
        }
    ]
};

export default AuthenticationRoutes;
