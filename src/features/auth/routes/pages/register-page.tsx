import Heading  from "@/features/auth/shared/components/heading"
import RegisterForm from "@/features/auth/components/layout/register/register-form"



export default function RegisterPage() {
  return (
<div className="mx-auto flex w-full max-w-lg flex-col justify-center gap-10">
    <Heading>Create Account </Heading>
    <RegisterForm />
    </div>  )
}