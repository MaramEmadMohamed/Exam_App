// features/submission/types/submission.d.ts
export interface SubmitAnswer {
  questionId: string;
  answerId: string;
}

export interface SubmitExamBody {
  examId: string;
  answers: SubmitAnswer[];
  startedAt: string;
}

export interface Submission {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  exam: { id: string; title: string; duration: number };
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
}

export interface SubmissionAnswer {
  id: string;
  text: string;
}

export interface SubmissionAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer: SubmissionAnswer | null;
  isCorrect: boolean;
  correctAnswer: SubmissionAnswer | null;
}

export interface SubmissionResult {
  submission: Submission;
  analytics: SubmissionAnalytics[];
}

export interface SubmitExamResponse {
  status: boolean;
  code: number;
  payload: SubmissionResult;
}