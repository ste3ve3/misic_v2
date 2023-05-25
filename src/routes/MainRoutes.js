import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import NotFound from 'views/pages/NotFound';
import ProjectsPage from 'views/pages/ProjectsPage';
import CalendarPage from 'views/pages/calendar/CalendarPage';
import LeadersPage from 'views/dashboard/members/LeadersPage';
import UsersPage from 'views/dashboard/members/UsersPage';
import BlogsPage from 'views/pages/blog/BlogsPage';
import AddBlogForm from 'components/blog/AddBlogForm';
import EditBlog from 'views/pages/blog/EditBlog';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'home',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'members',
            children: [
                {
                    path: 'leaders',
                    element: <LeadersPage />
                },
                {
                    path: 'users',
                    element: <UsersPage />
                }
            ]
        },

        {
            path: 'content',
            children: [
                {
                    path: 'blogs',
                    children: [
                        { path: '', element: <BlogsPage /> },
                        { path: 'new', element: <AddBlogForm /> },
                        { path: 'edit', children: [{ path: ':slug', element: <EditBlog /> }] }
                    ]
                },
                {
                    path: 'projects',
                    element: <ProjectsPage />
                },
                {
                    path: 'calendar',
                    element: <CalendarPage />
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
