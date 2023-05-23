// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const activities = {
    id: 'activities',
    title: 'Activities',
    type: 'group',
    children: [
        {
            id: 'calendar',
            title: 'Calendar',
            type: 'item',
            url: '/activities/calendar',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'events',
            title: 'Events',
            type: 'item',
            url: '/activities/events',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        // {
        //     id: 'util-color',
        //     title: 'Color',
        //     type: 'item',
        //     url: '/utils/util-color',
        //     icon: icons.IconPalette,
        //     breadcrumbs: false
        // },
        {
            id: 'testimonials',
            title: 'Testimonials',
            type: 'item',
            url: '/activities/testimonials',
            icon: icons.IconShadow,
            breadcrumbs: false
        }
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     icon: icons.IconWindmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default activities;
