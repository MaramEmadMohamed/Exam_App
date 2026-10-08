import type { ROLES } from "../constant/role.constant";

export type IRole = (typeof ROLES)[keyof typeof ROLES];
export type IGender = (typeof GENDERS)[keyof typeof GENDERS];
export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  gender: IGender;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: IRole;
}
