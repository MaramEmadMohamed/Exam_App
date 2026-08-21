import type { RouteObject } from "react-router";
import DiplomaPage from "./pages/diploma-page";
import DiplomaDetailsPage from "./pages/diploma-details-page";


export const diplomaRoutes: RouteObject[] = [
  {
    index: true,
    element: <DiplomaPage />,
  },
  {
    path: ":id",
    element: <DiplomaDetailsPage />,
  },
];