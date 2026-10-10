import { useFormContext } from "react-hook-form";
import type { IRegisterFormValues } from "@/features/auth/components/layout/register/form/types/register";
import { useRegisterWithErrorRevalidation } from "@/features/auth/hooks/use-register-with-error-revalidation";
import { Field, FieldError, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input/input";

export default function PasswordStep() {
  const {
    formState: { errors },
  } = useFormContext<IRegisterFormValues>();
  const registerWithErrorRevalidation =
    useRegisterWithErrorRevalidation<IRegisterFormValues>();

  return (
    <>
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" autoComplete="new-password" aria-invalid={!!errors.password} aria-describedby="password-error" {...registerWithErrorRevalidation("password", ["confirmPassword"])} />
        <FieldError id="password-error">{errors.password?.message}</FieldError>
      </Field>
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
        <Input id="confirmPassword" type="password" autoComplete="new-password" aria-invalid={!!errors.confirmPassword} aria-describedby="confirmPassword-error" {...registerWithErrorRevalidation("confirmPassword")} />
        <FieldError id="confirmPassword-error">{errors.confirmPassword?.message}</FieldError>
      </Field>
    </>
  );
}
