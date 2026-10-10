import { useQuery } from "@tanstack/react-query";
import { getExam, getExams } from "../exam.apis";
import {
  EXAM_KEY,
  type ExamListParams,
} from "../exam.key";
import { getExamQuestionsApi } from "@/features/question/apis/questions.apis";

export function useExams(params?: ExamListParams) {
  return useQuery({
    queryKey: EXAM_KEY.list(params),
    queryFn: () => getExams(params),
  });
}

export function useExam(id?: string) {
  return useQuery({
    queryKey: EXAM_KEY.detail(id ?? ""),
    queryFn: () => getExam(id as string),
    enabled: Boolean(id),
  });
}

export function useExamQuestions(examId?: string) {
  return useQuery({
    queryKey: EXAM_KEY.questions(examId ?? ""),
    queryFn: () => getExamQuestionsApi(examId as string),
    enabled: Boolean(examId),
    staleTime: Infinity,
  });
}

