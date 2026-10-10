import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { IApiResponse, IErrorResponse } from "../types/api";
import { TOKEN_KEY } from "@/features/auth/constants/token.constant";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.token = token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse<IApiResponse>) => response,
  (error: AxiosError<IErrorResponse<unknown>>) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Something went wrong";

    return Promise.reject(new Error(message));
  },
);