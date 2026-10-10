import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import type { ILoginFormValues } from "./types/login";
import { loginSchema } from "@/features/auth/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input/input";
import { Button } from "@/ui/button/button";
import { Link } from "react-router";
import FormFeedback from "@/shared/components/form-feedback";
import { useLogin } from "@/features/auth/apis/mutations/use-login";
import { getApiErrorMessage } from "@/shared/lib/get-api-error-message";
export default function LoginForm() {
  const { mutate: login, error, isPending } = useLogin();
 
  const form = useForm<ILoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  

  const onSubmit: SubmitHandler<ILoginFormValues> = (values) => {
    login(values);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-full max-h-101.5 "
      >
        {/* //!! this means the boolean value of the error object, if there is an error, it will be true, otherwise false */}
        <Field aria-invalid={!!form.formState.errors.username}>
          <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
          <Input
            id="input-field-username"
            type="text"
            placeholder="user123"
            aria-invalid={!!form.formState.errors.username}
            aria-describedby="username-error"
            {...form.register("username")}
          />
          <FieldError id="username-error">{form.formState.errors.username?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="●●●●●●"
            aria-invalid={!!form.formState.errors.password}
            aria-describedby="password-error"
            {...form.register("password")}
          />
          <FieldError id="password-error">{form.formState.errors.password?.message}</FieldError>
          <FieldDescription className="text-right">
            <Button
              nativeButton={false}
              variant="link"
              render={<Link to="/forgot-password">Forget your password?</Link>}
            />
          </FieldDescription>
        </Field>


        {/* Feedback*/ }
        <FormFeedback>{error ? getApiErrorMessage(error) : null}</FormFeedback>

        {/* submit button form */}
        <Button
          disabled={form.formState.isSubmitting && !form.formState.isValid || isPending}
          isLoading={isPending}
          className="self-end mt-2 w-full"
          type="submit"
        >
          Log in
        </Button>

        <div className="text-center">
          <span>Don't have an account? </span>
          <Button
            nativeButton={false}
            variant="link"
            render={<Link to="/register">Create yours</Link>}
          ></Button>
        </div>
      </form>
    </FormProvider>
  );
}
