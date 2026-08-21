import { apiClient } from "@/shared/lib/axios";
import { TOKEN_KEY } from "@/features/auth/constant/token.constant";
import { DIPLOMA_ENDPOINT } from "./diploma.endpoint";
import type { Diploma, DiplomaInput, Page } from "./diploma.types";

interface PaginatedResponse<T> {
  data?: T[] | { items?: T[]; data?: T[]; diplomas?: T[] };
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
    metadata?: {
      total?: number;
      page?: number;
      limit?: number;
    };
  };
}

function toPage<T>(response: PaginatedResponse<T>): Page<T> {
  const payload = response.payload;
  const nestedData = Array.isArray(response.data) ? undefined : response.data;
  const items =
    payload?.data ??
    response.items ??
    (Array.isArray(response.data)
      ? response.data
      : (nestedData?.items ?? nestedData?.data ?? nestedData?.diplomas)) ??
    [];
  const pagination = response.pagination ?? payload?.metadata;
  return {
    items,
    total: response.total ?? pagination?.total ?? items.length,
    page: response.page ?? pagination?.page ?? 1,
    limit: response.limit ?? pagination?.limit ?? items.length,
  };
}

export async function getDiplomas(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const token = localStorage.getItem(TOKEN_KEY)?.trim();
  const config = {
    params,
    headers: token
      ? {
          token,
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  };

  const response = await apiClient.get<PaginatedResponse<Diploma>>(
    DIPLOMA_ENDPOINT,
    config,
  );
  return toPage(response.data);
}

export async function getDiploma(id: string) {
  const response = await apiClient.get<Diploma>(`${DIPLOMA_ENDPOINT}/${id}`);
  return response.data;
}

export async function createDiploma(payload: DiplomaInput) {
  const response = await apiClient.post<Diploma>(DIPLOMA_ENDPOINT, payload);
  return response.data;
}

export async function updateDiploma(
  id: string,
  payload: Partial<DiplomaInput>,
) {
  const response = await apiClient.put<Diploma>(
    `${DIPLOMA_ENDPOINT}/${id}`,
    payload,
  );
  return response.data;
}

export async function deleteDiploma(id: string) {
  await apiClient.delete(`${DIPLOMA_ENDPOINT}/${id}`);
}
