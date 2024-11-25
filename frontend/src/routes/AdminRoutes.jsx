import AdminLayout from "~/layouts/AdminLayout";
import ContactPage from "~/pages/admin/ContactPage";
import Dashboard from "~/pages/admin/Dashboard";
import UserPage from "~/pages/admin/UserPage";

export const AdminRoutes = {
  children: [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />
        },
        {
          path: "users",
          element: <UserPage />
        },
        {
          path: "contacts",
          element: <ContactPage />
        }
      ]
    }
  ]
};