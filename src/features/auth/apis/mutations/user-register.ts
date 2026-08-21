import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { loginApi, registerApi } from "../auth.apis";
import type { IRegisterFormValues } from "../../schemas/register-schema";
import useToken from "../../hooks/use-token";

export function useUserRegister() {
  const navigate = useNavigate();
  const { setToken } = useToken();

  return useMutation({
    mutationFn: (values: IRegisterFormValues) => registerApi(values),
    onSuccess: async (_response, values) => {
      try {
        const loginResponse = await loginApi({
          username: values.username,
          password: values.password,
        });
        setToken(loginResponse.token);
        toast.success("Account created successfully");
        navigate("/diploma");
      } catch (error) {
        const message = axios.isAxiosError(error)
          ? (error.response?.data?.message ?? "Account created. Please log in.")
          : "Account created. Please log in.";
        toast.success(message);
        navigate("/login");
      }
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? "Unable to create account")
        : "Unable to create account";
      toast.error(message);
    },
  });
}
