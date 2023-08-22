import { lazy } from 'react';

// project imports
import MapContainer from '../views/MapContainer';

// ==============================|| MAIN ROUTING ||============================== //

const MapRoutes = {
    path: '/',
    // element: <MainLayout />,
    children: [
        {
            path: '/',
            children: [
                {
                    path: 'map',
                    element: <MapContainer /> 
                }
            ]
        },
    ]
};

export default MapRoutes;
