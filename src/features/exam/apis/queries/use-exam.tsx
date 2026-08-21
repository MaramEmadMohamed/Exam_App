import { useQuery } from "@tanstack/react-query";
import { getExam, getExamQuestions, getExams } from "../exam.apis";
import {
  EXAM_KEY,
  type ExamListParams,
  type QuestionListParams,
} from "../exam.key";

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

export function useExamQuestions(
  examId?: string,
  params?: QuestionListParams,
) {
  return useQuery({
    queryKey: EXAM_KEY.questions(examId ?? "", params),
    queryFn: () => getExamQuestions(examId as string, params),
    enabled: Boolean(examId),
  });
}

export default useExams;
