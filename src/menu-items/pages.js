// assets
import { IconKey, IconBrandAsana, IconBrandDisqus, IconCalendar } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconBrandAsana,
    IconCalendar
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Content',
    caption: "Website's Content",
    type: 'group',
    children: [
        {
            id: 'calendar',
            title: 'Calendar',
            url: '/content/calendar',
            // target: true,
            icon: icons.IconCalendar,
            type: 'item'
        },
        {
            id: 'projects',
            title: 'Projects',
            url: '/content/projects',
            // target: true,
            icon: icons.IconBrandAsana,
            type: 'item'
        },
        {
            id: 'blogs',
            title: 'Blogs',
            url: '/content/blogs',
            // target: true,
            icon: IconBrandDisqus,
            type: 'item'
        }
    ]
};

export default pages;
