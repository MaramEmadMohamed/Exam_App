import type {
  ILoginFormValues,
  ILoginResponse,
} from "@/features/auth/components/layout/login/form/types/login";
import { api } from "@/shared/lib/axios";
import { AUTH_ENDPOINT } from "./auth.endpoint";
import type { IRegisterFormValues, IRegisterResponse } from "@/features/auth/components/layout/register/form/types/register";
import type { IApiResponse } from "@/shared/types/api";

export async function loginApi(values: ILoginFormValues) {
  const res = await api.post<IApiResponse<ILoginResponse>>(
    `${AUTH_ENDPOINT}/login`,
    values,
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Login failed");
  }

  const response = res.data.payload;
  const token =
    response.token ??
    response.accessToken ??
    response.access_token ??
    response.data?.token ??
    response.data?.accessToken ??
    response.data?.access_token ??
    response.payload?.token ??
    response.payload?.accessToken ??
    response.payload?.access_token;

  if (typeof token !== "string" || !token.trim()) {
    throw new Error("Login response did not include an access token");
  }

  return { ...response, token: token.trim() };
}



export async function registerApi(values: IRegisterFormValues) {
  const res = await api.post<IApiResponse<IRegisterResponse>>(
    `${AUTH_ENDPOINT}/register`,
    values,
  );

  if (!res.data.status) {
    throw new Error(res.data.message || "Registration failed");
  }

  const response = res.data.payload;
  const token =
    response.token ??
    response.accessToken ??
    response.access_token ??
    response.data?.token ??
    response.data?.accessToken ??
    response.data?.access_token ??
    response.payload?.token ??
    response.payload?.accessToken ??
    response.payload?.access_token;

  if (typeof token !== "string" || !token.trim()) {
    throw new Error("Registration response did not include an access token");
  }

  return { ...response, token: token.trim() };
}

export async function sendEmailVerificationApi(email: string) {
  const res = await api.post(`${AUTH_ENDPOINT}/send-email-verification`, {
    email,
  });
  return res.data;
}

export async function confirmEmailVerificationApi(email: string, code: string) {
  const res = await api.post(
    `${AUTH_ENDPOINT}/confirm-email-verification`,
    { email, code },
  );
  return res.data;
}
