import { useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input/input";
import type { IRegisterFormValues } from "@/features/auth/components/layout/register/form/types/register";
export default function EmailStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<IRegisterFormValues>();

  return (
    <Field className="sm:col-span-2">
      <FieldLabel htmlFor="email">Email address</FieldLabel>
      <Input
        id="email"
        type="email"
        autoComplete="email"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
        {...register("email")}
      />
      <FieldError id="email-error">{errors.email?.message}</FieldError>
    </Field>
  );
}
