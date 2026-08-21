import { apiClient } from "@/shared/lib/axios";
import { TOKEN_KEY } from "@/features/auth/constant/token.constant";
import axios from "axios";
import {
  EXAM_ENDPOINT,
  QUESTION_ENDPOINT,
  SUBMISSION_ENDPOINT,
} from "./exam.endpoint";
import type {
  Answer,
  Exam,
  ExamInput,
  Page,
  Question,
  QuizResult,
} from "./exam.types";

interface PaginatedResponse<T> {
  data?: T[];
  items?: T[];
  total?: number;
  page?: number;
  limit?: number;
  pagination?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  payload?: {
    data?: T[];
    exams?: T[];
    metadata?: {
      total?: number;
      page?: number;
      limit?: number;
    };
  };
}

function toPage<T>(response: PaginatedResponse<T>): Page<T> {
  const items =
    response.payload?.data ??
    response.payload?.exams ??
    response.items ??
    response.data ??
    [];
  const pagination = response.pagination ?? response.payload?.metadata;
  return {
    items,
    total: response.total ?? pagination?.total ?? items.length,
    page: response.page ?? pagination?.page ?? 1,
    limit: response.limit ?? pagination?.limit ?? items.length,
  };
}

export async function getExams(params?: {
  page?: number;
  limit?: number;
  search?: string;
  diplomaId?: string;
}) {
  const token = localStorage.getItem(TOKEN_KEY)?.trim();
  const { diplomaId, ...query } = params ?? {};
  const config = {
    params: { ...query, subject: diplomaId },
    headers: {
      token: token ?? "",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };

  let response;
  try {
    response = await apiClient.get<PaginatedResponse<Exam>>(
      "/api/v1/exams",
      config,
    );
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 404) {
      throw error;
    }

    response = await apiClient.get<PaginatedResponse<Exam>>(EXAM_ENDPOINT, {
      ...config,
      params: { ...query, diplomaId },
    });
  }

  const page = toPage(response.data);
  return {
    ...page,
    items: page.items.map((exam) => ({
      ...exam,
      id: exam.id || exam._id || "",
    })),
  };
}

export async function getExam(id: string): Promise<Exam> {
  const response = await apiClient.get<
    Exam | { exam?: Exam; payload?: { exam?: Exam } }
  >(`${EXAM_ENDPOINT}/${id}`);
  const data = response.data;
  const exam = (
    "exam" in data ? data.exam : "payload" in data ? data.payload?.exam : data
  ) as Exam | undefined;

  if (!exam) {
    throw new Error("Exam was not found");
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

export async function getExamQuestions(
  examId: string,
  params?: {
    search?: string;
    sort?: string;
  },
) {
  const response = await apiClient.get<
    | Question[]
    | { questions?: Question[]; payload?: { questions?: Question[] } }
  >(`${QUESTION_ENDPOINT}/exam/${examId}`, { params });
  const data = response.data;
  return Array.isArray(data)
    ? data
    : (data.questions ?? data.payload?.questions ?? []);
}

export async function createQuestion(
  examId: string,
  payload: Omit<Question, "id" | "examId">,
) {
  const response = await apiClient.post<Question>(
    `${QUESTION_ENDPOINT}/exam/${examId}`,
    payload,
  );
  return response.data;
}

export async function submitExam(payload: {
  examId: string;
  answers: { questionId: string; answerId: string }[];
  startedAt?: string;
}) {
  const response = await apiClient.post<QuizResult | { payload?: QuizResult }>(
    SUBMISSION_ENDPOINT,
    payload,
  );
  const data = response.data;
  return "payload" in data && data.payload ? data.payload : data;
}

export type { Answer };
