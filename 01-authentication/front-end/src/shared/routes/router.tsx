import { createBrowserRouter } from 'react-router-dom';
import { SignIn } from '../../modules/auth/SignIn';
import { SignUp } from '../../modules/auth/SignUp';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppLoader } from '../components/loaders/AppLoader';
import { ModuleLoader } from '../components/loaders/ModuleLoader';

const DashboardLayout = lazy(() => import('../../shared/layouts/DashboardLayout'));
const Home = lazy(() => import('../../modules/home/Home'));
const Profile = lazy(() => import('../../modules/user/Profile'));
const ChangePassword = lazy(() => import('../../modules/user/ChangePassword'));

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: (
      <Suspense fallback={<ModuleLoader moduleName="View" />}>
        <PublicRoute>
          <Outlet />
        </PublicRoute>
      </Suspense>
    ),
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<AppLoader />}>
          <DashboardLayout>
            <Suspense fallback={<ModuleLoader />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'user',
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'change-password',
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
]);
