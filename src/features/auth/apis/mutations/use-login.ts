import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../auth.apis";
import type { ILoginFormValues } from "../../components/layout/login/form/types/login";
import { useNavigate } from "react-router";
import useToken from "../../hooks/use-token";

export function useLogin() {
  const navigate = useNavigate();
  const { setToken } = useToken();

  return useMutation({
    mutationFn: (values: ILoginFormValues) => loginApi(values),
    onSuccess: (response) => {
      setToken(response.token);
      navigate("/diplomas");
    },
  });
}
