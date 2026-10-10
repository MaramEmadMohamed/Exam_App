import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { registerApi } from "../auth.apis";
import type { IRegisterFormValues } from "@/features/auth/components/layout/register/form/types/register";
import useToken from "@/features/auth/hooks/use-token";

export function useRegister() {
  const navigate = useNavigate();
  const { setToken } = useToken();

  return useMutation({
    mutationFn: (values: IRegisterFormValues) => registerApi(values),
    onSuccess: (response) => {
      setToken(response.token);
      navigate("/diplomas");
    },
  });
}
