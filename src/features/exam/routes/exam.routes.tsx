import type { RouteObject } from "react-router";
import ExamPage from "./pages/exam-page";

export const examRoutes: RouteObject[] = [
  {
    index: true,
    element: <ExamPage />,
  },
];
