import { z } from "zod";
import { IUser } from "../../users/types/users";
import type { registerSchema } from "@/features/auth/schemas/register-schema";
export type IRegisterFormValues = z.infer<typeof registerSchema>;

export interface IRegisterResponse {
  users: IUser;
  token?: string;
  accessToken?: string;
  access_token?: string;
  data?: IRegisterResponse;
  payload?: IRegisterResponse;
}
