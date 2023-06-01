// assets
import { IconUsers, IconHome } from '@tabler/icons';

// constant
const icons = { IconHome, IconUsers };

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
        }
    ]
};

export default dashboard;
