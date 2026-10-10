// features/questions/api/questions.api.ts
import { api } from "@/shared/lib/axios";
import { QUESTIONS_ENDPOINT } from "../types/question.endpoint";
import type { Question, QuestionsResponse } from "../types/question";

export async function getExamQuestionsApi(examId: string): Promise<Question[]> {
  const { data } = await api.get<QuestionsResponse>(
    `${QUESTIONS_ENDPOINT}/exam/${encodeURIComponent(examId)}`,
  );

  const questions = data.payload?.questions;

  if (!questions) {
    throw new Error("Questions not found");
  }

  return questions;
}