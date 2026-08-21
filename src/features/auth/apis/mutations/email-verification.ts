import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  confirmEmailVerificationApi,
  sendEmailVerificationApi,
} from "../auth.apis";

function getVerificationErrorMessage(error: unknown) {
  return axios.isAxiosError(error)
    ? (error.response?.data?.message ?? "Email verification failed")
    : "Email verification failed";
}

export function useSendEmailVerification() {
  return useMutation({
    mutationFn: (email: string) => sendEmailVerificationApi(email),
    onError: (error) => toast.error(getVerificationErrorMessage(error)),
  });
}

export function useConfirmEmailVerification() {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      confirmEmailVerificationApi(email, code),
    onError: (error) => toast.error(getVerificationErrorMessage(error)),
  });
}
