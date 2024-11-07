import AdminLayout from "~/layouts/AdminLayout";

export const AdminRoutes = {
  children: [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <div>Dashboard</div>
        },
        {
          path: "users",
          element: <div>Manager users</div>
        },
        {
          path: "contacts",
          element: <div>Manager contacts</div>
        }
      ]
    }
  ]
};