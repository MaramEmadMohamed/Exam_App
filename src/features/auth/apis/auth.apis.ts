import type {
  ILoginFormValues,
  ILoginResponse,
} from "../components/layout/login/form/types/login";
import type { IRegisterFormValues } from "../schemas/register-schema";
import { apiClient } from "@/shared/lib/axios";
import { AUTH_ENDPOINT } from "./auth.endpoint";

export async function loginApi(values: ILoginFormValues) {
  const res = await apiClient.post<ILoginResponse>(
    `${AUTH_ENDPOINT}/login`,
    values,
  );
  const response = res.data as ILoginResponse & {
    accessToken?: string;
    access_token?: string;
    data?: {
      token?: string;
      accessToken?: string;
      access_token?: string;
    };
    payload?: {
      token?: string;
      accessToken?: string;
      access_token?: string;
    };
  };
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
  const res = await apiClient.post(`${AUTH_ENDPOINT}/register`, payload);
  return res.data;
}

export async function sendEmailVerificationApi(email: string) {
  const res = await apiClient.post(`${AUTH_ENDPOINT}/send-email-verification`, {
    email,
  });
  return res.data;
}

export async function confirmEmailVerificationApi(email: string, code: string) {
  const res = await apiClient.post(
    `${AUTH_ENDPOINT}/confirm-email-verification`,
    { email, code },
  );
  return res.data;
}
