// assets
import { IconUsers, IconHome } from '@tabler/icons';

// constant
const icons = { IconHome, IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
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
            id: 'members',
            title: 'Members',
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'users',
                    title: 'Users',
                    type: 'item',
                    url: '/members/users',
                    breadcrumbs: false
                },
                {
                    id: 'leaders',
                    title: 'Leaders',
                    type: 'item',
                    url: '/members/leaders',
                    breadcrumbs: false
                },
                {
                    id: 'fathers',
                    title: 'Fathers',
                    type: 'item',
                    url: '/members/fathers',
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default dashboard;
