// features/questions/hooks/use-exam-questions.ts
import { useQuery } from "@tanstack/react-query";
import { getExamQuestionsApi } from "../questions.apis";

export function useExamQuestions(examId?: string) {
  return useQuery({
    queryKey: ["exam-questions", examId],
    queryFn: () => getExamQuestionsApi(examId as string),
    enabled: !!examId,
    staleTime: Infinity,
  });
}