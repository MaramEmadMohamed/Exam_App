import type { RouteObject } from "react-router";
import QuestionsPage from "./pages/questions-page";

export const questionRoutes: RouteObject[] = [
  { 
    path: "/exams/:examId", element: <QuestionsPage />
   },
];
