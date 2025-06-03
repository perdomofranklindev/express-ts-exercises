import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "../../modules/auth/SignIn";
import { SignUp } from "../../modules/auth/SignUp";
import { Profile } from "../../modules/user/Profile";
import { ChangePassword } from "../../modules/user/ChangePassword";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Outlet } from "react-router-dom";
import { Home } from "../../modules/home/Home";

export const router = createBrowserRouter([
  {
    path: "/auth/sign-in",
    element: (
      <PublicRoute>
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: "/auth/sign-up",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user",
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
]);
