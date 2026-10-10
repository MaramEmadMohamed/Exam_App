import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getApiErrorMessage } from "@/shared/lib/get-api-error-message";
import {
  confirmEmailVerificationApi,
  sendEmailVerificationApi,
} from "../auth.apis";

export function useSendEmailVerification() {
  return useMutation({
    mutationFn: (email: string) => sendEmailVerificationApi(email),
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Email verification failed")),
  });
}

export function useConfirmEmailVerification() {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      confirmEmailVerificationApi(email, code),
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Email verification failed")),
  });
}
