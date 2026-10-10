// features/submission/apis/mutations/use-submit-exam.ts
import { useMutation } from "@tanstack/react-query";
import { submitExamApi } from "../submission.apis";

export function useSubmitExam() {
  return useMutation({
    mutationFn: submitExamApi,
  });
}