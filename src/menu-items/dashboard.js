// assets
import { IconUsers, IconHome, IconMoneybag } from '@tabler/icons';

// constant
const icons = { IconHome, IconUsers, IconMoneybag };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            id: 'home',
            title: 'Home',
            type: 'item',
            url: '/dashboard/home',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            id: 'payment',
            title: 'Payments',
            type: 'item',
            url: '/payments',
            icon: icons.IconMoneybag,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
