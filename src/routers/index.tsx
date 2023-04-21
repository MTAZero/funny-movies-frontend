import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouterLinks } from '../const';
import MainLayout from '../layouts/main';
import { HomePage, SharePage } from '../pages';
import { PrivateRoute } from '../components/private-component';

export const routes = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: RouterLinks.HOME_PAGE,
                element: <HomePage />,
            },
            {
                path: RouterLinks.SHARE_PAGE,
                element: (
                    <PrivateRoute>
                        <SharePage />
                    </PrivateRoute>
                ),
            },
            {
                path: '*',
                element: (
                    <>
                        <Navigate to={RouterLinks.HOME_PAGE} replace />
                    </>
                ),
            },
        ],
    },
]);
