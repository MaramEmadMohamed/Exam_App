export interface Exam {
  id: string;
  _id?: string;
  title: string;
  description?: string;
  diplomaId?: string;
  duration?: number;
  questionCount?: number;
  numberOfQuestions?: number;
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
