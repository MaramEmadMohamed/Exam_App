import { Navigate, type RouteObject } from "react-router";
import DiplomaDetails from "../components/diploma-details";
import DiplomaPage from "./pages/diploma-page";

export const diplomaRoutes: RouteObject[] = [
  { path: "/diplomas", element: <DiplomaPage /> },
  { path: "/diplomas/:id", element: <Navigate to="exams" replace /> },
  { path: "/diplomas/:id/exams", element: <DiplomaDetails /> },
];