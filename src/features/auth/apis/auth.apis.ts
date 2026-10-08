import type {
  ILoginFormValues,
  ILoginResponse,
} from "../components/layout/login/form/types/login";
import { api } from "@/shared/lib/axios";
import { AUTH_ENDPOINT } from "./auth.endpoint";
import type { IRegisterFormValues } from "../components/layout/register/form/types/register";
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
  const payload = {
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
    email: values.email,
    phone: values.phone,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };
  const res = await api.post(`${AUTH_ENDPOINT}/register`, payload);
  return res.data;
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
