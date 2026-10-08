import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "@/ui/button/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/ui/input-otp";
import FormFeedback from "@/shared/components/form-feedback";

import { useUserRegister } from "@/features/auth/apis/mutations/user-register";
import {
  useConfirmEmailVerification,
  useSendEmailVerification,
} from "@/features/auth/apis/mutations/email-verification";
import { ArrowRight } from "lucide-react";
import type { IRegisterFormValues } from "./form/types/register";
import { personalDetailsSchema, registerSchema } from "@/features/auth/schemas/register-schema";

export default function RegisterForm() {
  const { mutate: register, error, isPending } = useUserRegister();
  const { mutate: sendVerification, isPending: isSending } = useSendEmailVerification();
  const { mutate: confirmVerification, isPending: isConfirming } = useConfirmEmailVerification();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [countryCode, setCountryCode] = useState("+20");

  
  const form = useForm<IRegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const sendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailIsValid = await form.trigger("email");
    if (!emailIsValid) return;

    sendVerification(form.getValues("email"), {
      onSuccess: () => {
        setStep(2);
        setSecondsRemaining(60);
        setVerificationCode("");
        toast.success("Verification code sent to your email");
      },
    });
  };

  useEffect(() => {
    if (step !== 2 || secondsRemaining === 0) return;

    const timer = window.setInterval(() => {
      setSecondsRemaining((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [step, secondsRemaining]);

  const resendCode = () => {
    if (secondsRemaining > 0) return;

    sendVerification(form.getValues("email"), {
      onSuccess: () => {
        setSecondsRemaining(60);
        setVerificationCode("");
        toast.success("A new verification code was sent");
      },
    });
  };

  const verifyEmail = () => {
    const email = form.getValues("email");
    if (!verificationCode.trim()) return;

    confirmVerification(
      { email, code: verificationCode.trim() },
      {
        onSuccess: () => {
          setStep(3);
          toast.success("Email verified");
        },
      },
    );
  };

  const continueToPassword = async () => {
    const details = form.getValues([
      "firstName",
      "lastName",
      "username",
      "phone",
      "gender",
    ]);
    const result = personalDetailsSchema.safeParse({
      firstName: details[0],
      lastName: details[1],
      username: details[2],
      phone: details[3],
      gender: details[4],
    });

    form.clearErrors(["firstName", "lastName", "username", "phone", "gender"]);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (
          field === "firstName" ||
          field === "lastName" ||
          field === "username" ||
          field === "phone" ||
          field === "gender"
        ) {
          form.setError(field, { message: issue.message });
        }
      });
      return;
    }

    setStep(4);
  };

  const onSubmit: SubmitHandler<IRegisterFormValues> = (values) => {
    register({
      ...values,
      phone: `${countryCode}${values.phone.replace(/^0+/, "")}`,
    });
  };
  const handleRegisterSubmit = form.handleSubmit(onSubmit);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={
          step === 1
            ? sendCode
            : step === 4
              ? handleRegisterSubmit
              : (event) => event.preventDefault()
        }
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {step === 1 && (
            
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </Field>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4 sm:col-span-2">
            <span className="font-bold text-blue-600 font-heading">Verity OTP</span>
            <p className="text-sm text-slate-500">
             Please enter the 6-digit code we have sent to :
             <span className="text-gray-900" >{form.getValues("email")}</span>.
            </p>
            <Field>
              <FieldLabel htmlFor="verificationCode"></FieldLabel>
              <InputOTP
                maxLength={6}
                inputMode="numeric"
                value={verificationCode}
                onChange={setVerificationCode}
                aria-label="Verification code"
              >
                <InputOTPGroup className="flex items-center gap-2">
                  <InputOTPSlot index={0} className="size-11 rounded-md border-2 border-slate-300 bg-white text-lg font-semibold shadow-sm transition-all duration-200 data-[active=true]:border-blue-500 data-[active=true]:bg-blue-50 data-[active=true]:shadow-[0_0_0_4px_rgba(59,130,246,0.18)]" />
                  <InputOTPSlot index={1} className="size-11 rounded-md border-2 border-slate-300 bg-white text-lg font-semibold shadow-sm transition-all duration-200 data-[active=true]:border-blue-500 data-[active=true]:bg-blue-50 data-[active=true]:shadow-[0_0_0_4px_rgba(59,130,246,0.18)]" />
                  <InputOTPSlot index={2} className="size-11 rounded-md border-2 border-slate-300 bg-white text-lg font-semibold shadow-sm transition-all duration-200 data-[active=true]:border-blue-500 data-[active=true]:bg-blue-50 data-[active=true]:shadow-[0_0_0_4px_rgba(59,130,246,0.18)]" />
                  <InputOTPSlot index={3} className="size-11 rounded-md border-2 border-slate-300 bg-white text-lg font-semibold shadow-sm transition-all duration-200 data-[active=true]:border-blue-500 data-[active=true]:bg-blue-50 data-[active=true]:shadow-[0_0_0_4px_rgba(59,130,246,0.18)]" />
                  <InputOTPSlot index={4} className="size-11 rounded-md border-2 border-slate-300 bg-white text-lg font-semibold shadow-sm transition-all duration-200 data-[active=true]:border-blue-500 data-[active=true]:bg-blue-50 data-[active=true]:shadow-[0_0_0_4px_rgba(59,130,246,0.18)]" />
                  <InputOTPSlot index={5} className="size-11 rounded-md border-2 border-slate-300 bg-white text-lg font-semibold shadow-sm transition-all duration-200 data-[active=true]:border-blue-500 data-[active=true]:bg-blue-50 data-[active=true]:shadow-[0_0_0_4px_rgba(59,130,246,0.18)]" />
                </InputOTPGroup>
              </InputOTP>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>
                  {secondsRemaining > 0
                    ? `You can request a new code in: ${secondsRemaining}s`
                    : "You can request a new code now:"}
                </span>
                <Button
                  type="button"
                  variant="link"
                  disabled={secondsRemaining > 0 || isSending}
                  isLoading={isSending}
                  onClick={resendCode}
                >
                  Resend code
                </Button>
              </div>
            </Field>
          </div>
        )}

        {step === 3 && (
          <FieldGroup className="sm:col-span-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="firstName">First name</FieldLabel>
                <Input id="firstName" required autoComplete="given-name" aria-invalid={!!form.formState.errors.firstName} aria-describedby="firstName-error" {...form.register("firstName")} />
                <FieldError id="firstName-error">{form.formState.errors.firstName?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                <Input id="lastName" required autoComplete="family-name" aria-invalid={!!form.formState.errors.lastName} aria-describedby="lastName-error" {...form.register("lastName")} />
                <FieldError id="lastName-error">{form.formState.errors.lastName?.message}</FieldError>
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" required autoComplete="username" aria-invalid={!!form.formState.errors.username} aria-describedby="username-error" {...form.register("username")} />
                <FieldError id="username-error">{form.formState.errors.username?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                <div className="flex gap-2">
                  <select
                    aria-label="Country calling code"
                    value={countryCode}
                    onChange={(event) => setCountryCode(event.target.value)}
                    className="h-11.5 w-28 shrink-0 border border-input bg-background px-2 text-sm outline-none transition-colors focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-400/50"
                  >
                    <option value="+20">EG +20</option>
                    <option value="+1">US +1</option>
                    <option value="+44">UK +44</option>
                    <option value="+33">FR +33</option>
                    <option value="+49">DE +49</option>
                    <option value="+81">JP +81</option>
                    <option value="+971">UAE +971</option>
                  </select>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    autoComplete="tel-national"
                    placeholder="100 000 0000"
                    aria-invalid={!!form.formState.errors.phone}
                    aria-describedby="phone-error"
                    {...form.register("phone")}
                  />
                </div>
                <FieldError id="phone-error">{form.formState.errors.phone?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                <select
                  id="gender"
                  aria-invalid={!!form.formState.errors.gender}
                  aria-describedby="gender-error"
                  className="h-11.5 w-full border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-400/50"
                  {...form.register("gender")}
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                <FieldError id="gender-error">{form.formState.errors.gender?.message}</FieldError>
              </Field>
            </div>
          </FieldGroup>
        )}

        {step === 4 && (
          <>
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" autoComplete="new-password" aria-invalid={!!form.formState.errors.password} aria-describedby="password-error" {...form.register("password")} />
              <FieldError id="password-error">{form.formState.errors.password?.message}</FieldError>
            </Field>
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
              <Input id="confirmPassword" type="password" autoComplete="new-password" aria-invalid={!!form.formState.errors.confirmPassword} aria-describedby="confirmPassword-error" {...form.register("confirmPassword")} />
              <FieldError id="confirmPassword-error">{form.formState.errors.confirmPassword?.message}</FieldError>
            </Field>
          </>
        )}

        <div className="flex flex-col gap-4 sm:col-span-2">
          <FormFeedback>{error ? "Unable to create account. Please check your details." : null}</FormFeedback>
          {step === 1 && (
            <Button variant='outline'  disabled={isSending} isLoading={isSending} type="submit" className="w-full">
              Next <ArrowRight className="ml-2" />
            </Button>
          )}
          {step === 2 && (
            <Button
              disabled={isConfirming || !verificationCode.trim()}
              isLoading={isConfirming}
               variant='outline'
              type="button"
              onClick={verifyEmail}
              className="w-full"
            >
              Verify Code
            </Button>
          )}
          {step === 3 && (
            <Button
              variant="outline"
              type="button"
              onClick={continueToPassword}
              className="w-full"
            >
              Next <ArrowRight className="ml-2" />
            </Button>
          )}
          {step === 4 && (
            <Button variant='outline' disabled={isPending} isLoading={isPending} type="submit" className="w-full">
              Create account
            </Button>
          )}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link className="font-semibold text-blue-600" to="/login">Log in</Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}