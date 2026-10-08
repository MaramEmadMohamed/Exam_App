import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    username: z
      .string()
      .min(5, "Username must be at least 5 characters")
      .max(20),
    email: z.string().email("Enter a valid email address"),
    phone: z
      .string()
      .min(7, "Phone number must be at least 7 digits")
      .max(20, "Phone number is too long")
      .regex(/^[+\d][\d\s()-]*$/, "Enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "Use uppercase, lowercase, number, and special character",
      ),
    gender: z.enum(["male", "female"]),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const personalDetailsSchema = z.object({
  firstName: registerSchema.shape.firstName,
  lastName: registerSchema.shape.lastName,
  username: registerSchema.shape.username,
  phone: registerSchema.shape.phone,
  gender: registerSchema.shape.gender,
});

export type IRegisterFormValues = z.infer<typeof registerSchema>;
