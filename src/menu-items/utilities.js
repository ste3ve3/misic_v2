// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconMailOpened, IconArticle, IconUnlink } from '@tabler/icons';

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
            id: 'news',
            title: 'News',
            type: 'item',
            url: '/activities/news',
            icon: IconArticle,
            breadcrumbs: false
        },
        {
            id: 'announcements',
            title: 'Announcements',
            type: 'item',
            url: '/activities/announcements',
            icon: IconUnlink,
            breadcrumbs: false
        },
        {
            id: 'testimonials',
            title: 'Testimonials',
            type: 'item',
            url: '/activities/testimonials',
            icon: icons.IconShadow,
            breadcrumbs: false
        },
        {
            id: 'messages',
            title: 'Messages',
            type: 'item',
            url: '/activities/messages',
            icon: IconMailOpened,
            breadcrumbs: false
        }
    ]
};

export default activities;
