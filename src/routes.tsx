import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import { authRoutes } from "./features/auth/routes/auth.routes";
import AuthLayout from "./features/auth/components/layout/auth-layout";
import App from "./App";
import { diplomaRoutes } from "./features/diploma/routes/diploma.routes";
import AccountSettingsPage from "./features/auth/users/routes/pages/account-settings-page";
import { questionRoutes } from "./features/question/routes/questions.routes";
import AuthGuard from "./features/auth/components/auth-guard";
import DiplomaLayout from "./features/diploma/components/diploma-layout";

export const routes: RouteObject[] =[
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        element: <AuthLayout />,
        children: authRoutes,
      },
      {
        element: <AuthGuard />,
        children: [
          {
            element: <DiplomaLayout />,
            children: diplomaRoutes,
          },
          {
            path: "/account-settings",
            element: <AccountSettingsPage />,
          },
          {
            element: <DiplomaLayout />,
            children: questionRoutes,
          },
        ],
      },
      
    ],
  },
];