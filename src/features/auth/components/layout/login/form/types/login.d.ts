import { z } from "zod";
import { IUser } from "../../users/types/users";
import { loginSchema } from "./login-schema";
export type ILoginFormValues = z.infer<typeof loginSchema>;

export interface ILoginResponse {
  users: IUser;
  token?: string;
  accessToken?: string;
  access_token?: string;
  data?: ILoginResponse;
  payload?: ILoginResponse;
}
