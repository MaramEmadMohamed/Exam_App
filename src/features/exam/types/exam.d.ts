export interface Exam {
  id: string;
  title: string;
  description?: string;
  image?: string;
  duration?: number;
  questionsCount?: number;
  diplomaId?: string;
  diploma?: { id: string; title: string };
  immutable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExamInput {
  title: string;
  description?: string;
  diplomaId: string;
  duration?: number;
}

export interface Question {
  id: string;
  examId: string;
  text: string;
  answers?: Answer[];
}

export interface Answer {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface SubmissionAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer?: Answer | null;
  isCorrect: boolean;
  correctAnswer?: Answer | null;
}

export interface QuizResult {
  submission?: {
    id: string;
    score?: number;
    passed?: boolean;
  };
  analytics: SubmissionAnalytics[];
}

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
export interface ExamsMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ExamsResponse {
  status: boolean;
  code: number;
  payload: {
    data: Exam[];
    metadata: ExamsMetadata;
  };
}

// GET /api/exams/{id}
export interface ExamResponse {
  status?: boolean;
  code?: number;
  payload?: { exam?: Exam };
  exam?: Exam;
}
export interface ExamsParams {
  diplomaId?: string;
  immutable?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "title" | "createdAt" | "questions";
  sortOrder?: "asc" | "desc";
  search?: string;
}