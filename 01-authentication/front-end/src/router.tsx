import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SignIn } from './modules/auth/SignIn';
import { SignUp } from './modules/auth/SignUp';
import { Profile } from './modules/user/Profile';
import { ChangePassword } from './modules/user/ChangePassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth/sign-in" replace />,
  },
  {
    path: '/auth/sign-in',
    element: <SignIn />,
  },
  {
    path: '/auth/sign-up',
    element: <SignUp />,
  },
  {
    path: '/user/profile',
    element: <Profile />,
  },
  {
    path: '/user/change-password',
    element: <ChangePassword />,
  },
]);
