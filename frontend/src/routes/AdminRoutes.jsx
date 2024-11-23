import AdminLayout from "~/layouts/AdminLayout";
import ContactPage from "~/pages/admin/ContactPage";
import UserPage from "~/pages/admin/UserPage";

export const AdminRoutes = {
  children: [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <p>Hello</p>
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