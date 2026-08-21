import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../auth.apis";
import type { ILoginFormValues } from "../../components/layout/login/form/types/login";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import useToken from "../../hooks/use-token";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Invalid username or password",
) {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const responseData = error.response?.data;
  const responseMessage = responseData?.message ?? responseData?.error;

  if (typeof responseMessage === "string") {
    return responseMessage;
  }

  if (Array.isArray(responseMessage)) {
    return (
      responseMessage
        .filter((message) => typeof message === "string")
        .join(", ") || fallback
    );
  }

  const validationErrors = responseData?.errors;
  if (Array.isArray(validationErrors)) {
    return (
      validationErrors
        .map((item) => (typeof item === "string" ? item : item?.message))
        .filter((message): message is string => Boolean(message))
        .join(", ") || fallback
    );
  }

  return fallback;
}

export function useUserLogin() {
  const navigate = useNavigate();

  const { setToken } = useToken();

  return useMutation({
    mutationFn: (values: ILoginFormValues) => loginApi(values),
    onSuccess: (response) => {
      setToken(response.token);
      navigate("/diploma");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}
