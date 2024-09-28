import React from "react";
import Loadable from "~/components/Loadable";

const NotFoundPage = Loadable(React.lazy(() => import("~/pages/error/not-found")));

export const ErrorRoutes = {
  children: [
    {
      path: "*",
      element: <NotFoundPage />,
    }
  ]
};