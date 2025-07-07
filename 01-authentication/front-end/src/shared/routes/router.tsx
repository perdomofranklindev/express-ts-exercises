import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../../modules/auth/pages/SignInPage';
import SignUpPage from '../../modules/auth/pages/SignUpPage';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppLoader } from '../components/loaders/AppLoader';
import { ModuleLoader } from '../components/loaders/ModuleLoader';

const DashboardLayout = lazy(() => import('../../shared/layouts/DashboardLayout'));
const HomePage = lazy(() => import('../../modules/home/pages/HomePage'));
const ProfilePage = lazy(() => import('../../modules/user/pages/ProfilePage'));
const ChangePasswordPage = lazy(() => import('../../modules/user/pages/ChangePasswordPage'));

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
        element: <SignInPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
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
        element: <HomePage />,
      },
      {
        path: 'user',
        children: [
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'change-password',
            element: <ChangePasswordPage />,
          },
        ],
      },
    ],
  },
]);
