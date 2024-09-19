import DashboardLayout from "../layouts/DashboardLayout";

export const DashboardRoutes = {
  children: [
    {
      path: "/management",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <h2>Hello hgbaodev</h2>
        },
      ]
    }
  ]
}