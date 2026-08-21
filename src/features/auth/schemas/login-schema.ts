import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, "username must be at least 5 characters long")
    .max(20, "username must be at most 20 characters long")
    .nonempty("username is required"),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "password must be at least 8 characters long")
    .max(20, "password must be at most 20 characters long")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
});
