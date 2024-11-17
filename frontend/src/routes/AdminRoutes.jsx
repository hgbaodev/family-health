import AdminLayout from "~/layouts/AdminLayout";
import ContactPage from "~/pages/admin/ContactPage";
import UserPage from "~/pages/admin/UserPage";
import DashBoardPage from "~/pages/manager/DashBoardPage";

export const AdminRoutes = {
  children: [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <DashBoardPage />
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