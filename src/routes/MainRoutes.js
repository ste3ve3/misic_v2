import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import NotFound from 'views/pages/NotFound';
import UsersPage from 'views/dashboard/members/UsersPage';
import PaymentsPage from 'views/dashboard/PaymentsPage';
import MapContainer from '../views/MapContainer';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <UsersPage />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'home',
                    element: <UsersPage />
                }
            ]
        },
        {
            path: '/',
            children: [
                {
                    path: 'payments',
                    element: <PaymentsPage /> 
                }
            ]
        },
        {
            path: '/',
            children: [
                {
                    path: 'map',
                    element: <MapContainer /> 
                }
            ]
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
};

export default MainRoutes;
