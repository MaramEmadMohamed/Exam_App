import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import type { ILoginFormValues } from "./types/login"
import { loginSchema } from "@/features/auth/schemas/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/ui/field"
import { Input } from "@/ui/input/input"
import { Button } from "@/ui/button/button"
import { Link } from "react-router"
import { useUserLogin } from "@/features/auth/apis/mutations/user-login"
import { getApiErrorMessage } from "@/features/auth/apis/mutations/user-login"
import FormFeedback from "@/shared/components/form-feedback"
export default function LoginForm() {
  const { mutate: login, error, isPending } = useUserLogin();

    const form = useForm<ILoginFormValues>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    })

    const onSubmit: SubmitHandler<ILoginFormValues> = (values) => {
      login(values)
    }


  return (
   <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full max-h-101.5 ">
         <Field aria-invalid={!!form.formState.errors.username}>
       <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
       <Input
         id="input-field-username"
         type="text"
         placeholder="user123"
         {...form.register("username")}
      />
       <FieldError>{form.formState.errors.username?.message}</FieldError>
     </Field>

      <Field>
       <FieldLabel htmlFor="password">Password</FieldLabel>
       <Input
         id="password"
         type="password"
         placeholder="●●●●●●"
        {...form.register("password")}
       />
       <FieldError>{form.formState.errors.password?.message}</FieldError>
       <FieldDescription className="text-right">
        <Button nativeButton={false} variant="link" render={<Link to="/forgot-password">Forget your password?</Link>}/>
       </FieldDescription>
     </Field>

    <FormFeedback>{error ? getApiErrorMessage(error) : null}</FormFeedback>

    <Button 
    disabled={form.formState.isSubmitting && !form.formState.isValid}
    isLoading={isPending}
    className='self-end mt-2 w-full'
     type="submit">Log in</Button>

<div className="text-center">
    <span>Don't have an account? </span>
    <Button nativeButton={false} variant="link" render={<Link to="/register">Create yours</Link>}></Button>
</div>
    </form>

   </FormProvider>  )
}
