import { api } from "@/shared/lib/axios";
import { DIPLOMA_ENDPOINT } from "../types/diploma.endpoint";
import type {
  DiplomaDetails,
  DiplomaDetailsResponse,
  DiplomasResponse,
} from "../types/diploma";


export async function getDiplomasApi({params}: {params:URLSearchParams} ) {
  const response = await api.get(DIPLOMA_ENDPOINT,{params});
  return response.data;
}

export async function getDiplomaListApi(searchParams?: URLSearchParams) {
  const { data } = await api.get<DiplomasResponse>(DIPLOMA_ENDPOINT, {
    params: searchParams,
  });
  return data.payload;
}
export async function getDiplomaDetailsApi(id: string): Promise<DiplomaDetails> {
  const { data } = await api.get<DiplomaDetailsResponse>(
    `${DIPLOMA_ENDPOINT}/${encodeURIComponent(id)}`,
  );

  const diploma = data.payload?.diploma ?? data.diploma;

  if (!diploma) {
    throw new Error("Diploma not found");
  }

  return diploma;
}
