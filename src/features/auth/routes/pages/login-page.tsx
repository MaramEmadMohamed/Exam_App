import LoginForm from "@/features/auth/components/layout/login/form/login-form"
import  Heading from "@/features/auth/shared/components/heading"
export default function LoginPage() {
  return (
  <div className="mx-auto flex w-full max-w-lg flex-col justify-center gap-10">
    <Heading>Login</Heading>
    <LoginForm />
    </div>
  )
}


