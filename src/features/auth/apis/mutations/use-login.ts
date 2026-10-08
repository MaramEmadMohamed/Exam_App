import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../auth.apis";
import type { ILoginFormValues } from "../../components/layout/login/form/types/login";
import { useNavigate } from "react-router";
import useToken from "../../hooks/use-token";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
) {
  if (axios.isAxiosError<{ message?: unknown }>(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

export function useLogin() {
  const navigate = useNavigate();
  const { setToken } = useToken();

  return useMutation({
    mutationFn: (values: ILoginFormValues) => loginApi(values),
    onSuccess: (response) => {
      setToken(response.token);
      navigate("/diploma");
    },
  });
}
