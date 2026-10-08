import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .nonempty("username is required"),
  password: z
    .string()
    .nonempty("password is required"),
});
