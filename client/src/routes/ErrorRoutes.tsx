import NotFoundPage from "../pages/error/not-found";

export const ErrorRoutes = {
  children: [
    {
      path: "*",
      element: <NotFoundPage />,
    }
  ]
}