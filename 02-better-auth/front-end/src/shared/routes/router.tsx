import { Suspense, lazy } from "react";
import Loader from "../components/Loader";
const HomePage = lazy(() => import("../../modules/home/pages/HomePage"));
const SignInPage = lazy(() => import("../../modules/auth/pages/SignInPage"));
const SignUpPage = lazy(() => import("../../modules/auth/pages/SignUpPage"));
const UserAccountPage = lazy(
  () => import("../../modules/user/pages/UserAccountPage")
);
import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthProvider, ProtectedRoute, PublicRoute } from "../auth";


export const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
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
            element: (
              <Suspense fallback={<Loader />}>
                <SignInPage />
              </Suspense>
            ),
          },
          {
            path: "sign-up",
            element: (
              <Suspense fallback={<Loader />}>
                <SignUpPage />
              </Suspense>
            ),
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
            element: (
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: "user",
            children: [
              {
                path: "account",
                element: (
                  <Suspense fallback={<Loader />}>
                    <UserAccountPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);
