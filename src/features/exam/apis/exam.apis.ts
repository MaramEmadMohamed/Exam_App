// features/exam/apis/exam.apis.ts
import { api as apiClient } from "@/shared/lib/axios";
import { EXAM_ENDPOINT } from "../types/exam.endpoint";
import type {
  Exam,
  ExamInput,
  ExamResponse,
  ExamsParams,
  ExamsResponse,
} from "../types/exam";

/* ───────────── Exams ───────────── */

// GET /exams  →  { status, code, payload: { data, metadata } }
export async function getExams(params?: ExamsParams) {
  const { data } = await apiClient.get<ExamsResponse>(EXAM_ENDPOINT, {
    params: { limit: 100, ...params },
  });

  return {
    items: data.payload.data,
    ...data.payload.metadata,
  };
}

// GET /exams/{id}  →  { payload: { exam } } أو { exam }
export async function getExam(id: string): Promise<Exam> {
  const { data } = await apiClient.get<ExamResponse>(
    `${EXAM_ENDPOINT}/${encodeURIComponent(id)}`,
  );

  console.log("exam response", data); // مؤقت: لحد ما نتأكد من الشكل

  const exam = data.payload?.exam ?? data.exam;

  if (!exam) {
    throw new Error("Exam not found");
  }

  return exam;
}

export async function createExam(payload: ExamInput) {
  const response = await apiClient.post<Exam>(EXAM_ENDPOINT, payload);
  return response.data;
}

export async function updateExam(id: string, payload: Partial<ExamInput>) {
  const response = await apiClient.put<Exam>(`${EXAM_ENDPOINT}/${id}`, payload);
  return response.data;
}

export async function deleteExam(id: string) {
  await apiClient.delete(`${EXAM_ENDPOINT}/${id}`);
}