import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { IApiResponse, IErrorResponse } from "../types/api";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response: AxiosResponse<IApiResponse>) => response,
  (error: AxiosError<IErrorResponse<unknown>>) => {
    const message =
      error.response?.data?.message ?? error.message ?? "Something went wrong";

    return Promise.reject(new Error(message));
  },
);
