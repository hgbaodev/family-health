import AuthLayout from "~/layouts/AuthLayout";
import Loadable from "~/components/Loadable";
import React from "react";
import AuthRoute from "~/guards/AuthRoute";

const LoginPage = Loadable(React.lazy(() => import("~/pages/auth/LoginPage")));
const RegisterPage = Loadable(React.lazy(() => import("~/pages/auth/RegisterPage")));
const ForgotPasswordPage = Loadable(React.lazy(() => import("~/pages/auth/ForgotPasswordPage")));

export const AuthRoutes = {
  children: [
    {
      path: "/auth",
      element: <AuthRoute component={AuthLayout} />,
      children: [
        {
          path: "login",
          element: <AuthRoute component={LoginPage} />
        },
        {
          path: "register",
          element: <AuthRoute component={RegisterPage} />
        },
        {
          path: "forgot-password",
          element: <AuthRoute component={ForgotPasswordPage} />,
        },
      ]
    }
  ]
};