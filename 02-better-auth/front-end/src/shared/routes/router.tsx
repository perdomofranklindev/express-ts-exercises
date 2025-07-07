import HomePage from "../../modules/home/pages/HomePage";
import SignInPage from "../../modules/auth/pages/SignInPage";
import SignUpPage from "../../modules/auth/pages/SignUpPage";
import UserAccountPage from "../../modules/user/pages/UserAccountPage";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Outlet />,
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
    element: <Outlet />,
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
]);
