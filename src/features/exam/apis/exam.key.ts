export const EXAM_KEY = {
  all: ["exams"] as const,
  lists: () => [...EXAM_KEY.all, "list"] as const,
  list: (params?: ExamListParams) => [...EXAM_KEY.lists(), params] as const,
  details: () => [...EXAM_KEY.all, "detail"] as const,
  detail: (id: string) => [...EXAM_KEY.details(), id] as const,
  questions: (examId: string, params?: QuestionListParams) =>
    [...EXAM_KEY.detail(examId), "questions", params] as const,
};

export interface ExamListParams {
  page?: number;
  limit?: number;
  search?: string;
  diplomaId?: string;
}

export interface QuestionListParams {
  search?: string;
  sort?: string;
}
