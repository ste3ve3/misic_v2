// assets
import { IconKey, IconBrandAsana, IconBrandDisqus } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconBrandAsana
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: 'Content',
    caption: "Website's Content",
    type: 'group',
    children: [
        // {
        //     id: 'authentication',
        //     title: 'Authentication',
        //     type: 'collapse',
        //     icon: icons.IconKey,

        //     children: [
        //         {
        //             id: 'login3',
        //             title: 'Login',
        //             type: 'item',
        //             url: '/pages/login/login3'
        //             // target: true
        //         },
        //         {
        //             id: 'register3',
        //             title: 'Register',
        //             type: 'item',
        //             url: '/pages/register/register3'
        //             // target: true
        //         }
        //     ]
        // },
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
