import React from "react";
import HomeLayout from "~/layouts/HomeLayout";
import Loadable from "~/components/Loadable";

const HomePage = Loadable(React.lazy(() => import("~/pages/home/HomePage")));

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