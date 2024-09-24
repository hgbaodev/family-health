import AuthLayout from "../layouts/AuthLayout";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

export const AuthRoutes = {
  children: [
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LoginPage />
        },
        {
          path: "register",
          element: <RegisterPage />
        },
        {
          path: "forgot-password",
          element: <ForgotPasswordPage />
        },
      ]
    }
  ]
};
