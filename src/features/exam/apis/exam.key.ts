export const EXAM_KEY = {
  all: ["exams"] ,
  lists: () => [...EXAM_KEY.all, "list"] ,
  list: (params?: ExamListParams) => [...EXAM_KEY.lists(), params] ,
  details: () => [...EXAM_KEY.all, "detail"] ,
  detail: (id: string) => [...EXAM_KEY.details(), id] ,
    questions: (examId: string) => ["exams", "questions", examId] ,
 } as const;

export interface ExamListParams {
  page?: number;
  limit?: number;
  search?: string;
  diplomaId?: string;
}

