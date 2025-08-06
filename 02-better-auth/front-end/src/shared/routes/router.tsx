import HomePage from "../../modules/home/pages/HomePage";
import SignInPage from "../../modules/auth/pages/SignInPage";
import SignUpPage from "../../modules/auth/pages/SignUpPage";
import UserAccountPage from "../../modules/user/pages/UserAccountPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider, ProtectedRoute, PublicRoute } from "../auth";

export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "/auth",
        element: (
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        ),
        children: [
          {
            path: "sign-in",
            element: <SignInPage />,
          },
          {
            path: "sign-up",
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "user",
            children: [
              {
                path: "account",
                element: <UserAccountPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
