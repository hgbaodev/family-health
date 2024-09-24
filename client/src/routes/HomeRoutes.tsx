import HomeLayout from "../layouts/HomeLayout";
import HomePage from "../pages/home/HomePage";

// Lazy load components

export const HomeRoutes = {
  children: [
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <HomePage />
        }
      ]
    }
  ]
};
