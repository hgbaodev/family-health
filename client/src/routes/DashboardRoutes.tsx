import DashboardLayout from "../layouts/DashboardLayout";
import DashBoardPage from "../pages/manager/DashBoardPage";
import MemberPage from "../pages/manager/MemberPage";

// Lazy load components

export const DashboardRoutes = {
  children: [
    {
      path: "/manager",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <DashBoardPage />
        },
        {
          path: "members",
          element: <MemberPage/> // You can lazy load this too if it becomes a separate component
        }
      ]
    }
  ]
};
