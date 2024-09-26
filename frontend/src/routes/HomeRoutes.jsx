
import HomeLayout from "~/layouts/HomeLayout";
import HomePage from "~/pages/home/HomePage";

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
