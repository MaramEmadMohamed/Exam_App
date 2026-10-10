// features/submission/apis/submission.apis.ts
import { api } from "@/shared/lib/axios";
import { SUBMISSION_ENDPOINT } from "../types/submission.endpoint";
import type {
  SubmitExamBody,
  SubmitExamResponse,
  SubmissionResult,
} from "../types/submission";

export async function submitExamApi(body: SubmitExamBody): Promise<SubmissionResult> {
  const { data } = await api.post<SubmitExamResponse>(SUBMISSION_ENDPOINT, body);

  if (!data.payload?.submission) {
    throw new Error("Submission failed");
  }

  return data.payload;
}