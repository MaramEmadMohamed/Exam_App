import type { RouteObject } from "react-router";
import { Navigate, Outlet } from "react-router";
import { authRoutes } from "./features/auth/routes/auth.routes";
import AuthLayout from "./features/auth/components/layout/auth-layout";
import App from "./App";
import { diplomaRoutes } from "./features/diploma/routes/diploma.routes";
import DiplomaPage from "./features/diploma/routes/pages/diploma-page";
import AuthGuard from "./features/auth/components/layout/login/auth-guard";
import AccountSettingsPage from "./features/auth/routes/pages/account-settings-page";
import { examRoutes } from "./features/exam/routes/exam.routes";
import ExamListPage from "./features/exam/routes/pages/exam-list-page";
import QuizPage from "./features/exam/routes/pages/quiz-page";
import ResultsPage from "./features/exam/routes/pages/results-page";
import DiplomaSubjectsPage from "./features/diploma/routes/pages/diploma-subjects-page";

export const routes: RouteObject[] =[
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        element: <AuthLayout />,
        children: authRoutes,
      },
      {
        path: "/diploma",
        element: (
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        ),
        children: diplomaRoutes,
      },
      {
        path: "/diplomas",
        element: (
          <AuthGuard>
            <DiplomaPage />
          </AuthGuard>
        ),
      },
      {
        path: "/account-settings",
        element: (
          <AuthGuard>
            <AccountSettingsPage />
          </AuthGuard>
        ),
      },
      {
        path: "/exam",
        element: (
          <AuthGuard>
            <Outlet />
          </AuthGuard>
        ),
        children: examRoutes,
      },
      {
        path: "/diplomas/:diplomaId/exams",
        element: (
          <AuthGuard>
            <ExamListPage />
          </AuthGuard>
        ),
      },
      {
        path: "/diplomas/:diplomaId/subjects",
        element: (
          <AuthGuard>
            <DiplomaSubjectsPage />
          </AuthGuard>
        ),
      },
      {
        path: "/subjects/:subjectId/exams",
        element: (
          <AuthGuard>
            <ExamListPage />
          </AuthGuard>
        ),
      },
      {
        path: "/exams/:examId",
        element: (
          <AuthGuard>
            <QuizPage />
          </AuthGuard>
        ),
      },
      {
        path: "/exams/:examId/results",
        element: (
          <AuthGuard>
            <ResultsPage />
          </AuthGuard>
        ),
      },
    ],
  },
];