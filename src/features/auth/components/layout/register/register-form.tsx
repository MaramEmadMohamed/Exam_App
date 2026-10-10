import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router";
import { useRegister } from "@/features/auth/apis/mutations/use-register";
import {
  useConfirmEmailVerification,
  useSendEmailVerification,
} from "@/features/auth/apis/mutations/use-email-verification";
import { COUNTRY_CODES } from "@/features/auth/constants/country-codes";
import { useCountdown } from "@/features/auth/hooks/use-countdown";
import type { IRegisterFormValues } from "@/features/auth/components/layout/register/form/types/register";
import { registerSchema } from "@/features/auth/schemas/register-schema";
import { getApiErrorMessage } from "@/shared/lib/get-api-error-message";
import { Button } from "@/ui/button/button";
import FormFeedback from "@/shared/components/form-feedback";
import EmailStep from "./steps/email-step";
import OtpStep from "./steps/otp-step";
import PasswordStep from "./steps/password-step";
import PersonalDetailsStep from "./steps/personal-details-step";

type Step = 1 | 2 | 3 | 4;

const RESEND_SECONDS = 60;

export default function RegisterForm() {
  const { mutate: register, error, isPending } = useRegister();
  const { mutate: sendVerification, isPending: isSending } =
    useSendEmailVerification();
  const { mutate: confirmVerification, isPending: isConfirming } =
    useConfirmEmailVerification();

  const [step, setStep] = useState<Step>(1);
  const [verificationCode, setVerificationCode] = useState("");
  const { secondsRemaining, startCountdown } = useCountdown(step === 2);
  const [countryCode, setCountryCode] = useState<string>(
    COUNTRY_CODES[0].value,
  );

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
        startCountdown(RESEND_SECONDS);
        setVerificationCode("");
        toast.success("Verification code sent to your email");
      },
      onError: (err) =>
        toast.error(
          getApiErrorMessage(err, "Unable to send verification code"),
        ),
    });
  };

  const resendCode = () => {
    if (secondsRemaining > 0) return;

    sendVerification(form.getValues("email"), {
      onSuccess: () => {
        startCountdown(RESEND_SECONDS);
        setVerificationCode("");
        toast.success("A new verification code was sent");
      },
      onError: (err) =>
        toast.error(
          getApiErrorMessage(err, "Unable to resend verification code"),
        ),
    });
  };

  const verifyEmail = () => {
    const email = form.getValues("email");
    const code = verificationCode.trim();
    if (!code) return;

    confirmVerification(
      { email, code },
      {
        onSuccess: () => {
          setStep(3);
          toast.success("Email verified");
        },
        onError: (err) =>
          toast.error(getApiErrorMessage(err, "Invalid verification code")),
      },
    );
  };

  const continueToPassword = async () => {
    const detailsAreValid = await form.trigger([
      "firstName",
      "lastName",
      "username",
      "phone",
    ]);
    if (!detailsAreValid) return;

    setStep(4);
  };

  const onSubmit: SubmitHandler<IRegisterFormValues> = (values) => {
    register({
      ...values,
      phone: `${countryCode}${values.phone.replace(/^0+/, "")}`,
    });
  };

  const handleRegisterSubmit = form.handleSubmit(onSubmit, (errors) => {
    console.error("Register validation errors:", errors);
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (step === 1) return sendCode(event);
    if (step === 4) return handleRegisterSubmit(event);
    event.preventDefault();
  };

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={handleFormSubmit}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
      >
        {step === 1 && <EmailStep />}
        {step === 2 && (
          <OtpStep
            verificationCode={verificationCode}
            onVerificationCodeChange={setVerificationCode}
            secondsRemaining={secondsRemaining}
            isSending={isSending}
            onResend={resendCode}
          />
        )}
        {step === 3 && (
          <PersonalDetailsStep
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
          />
        )}
        {step === 4 && <PasswordStep />}

        <div className="flex flex-col gap-4 sm:col-span-2">
          <FormFeedback>
            {error
              ? getApiErrorMessage(error, "Unable to create account")
              : null}
          </FormFeedback>

          {step === 1 && (
            <Button
              variant="outline"
              disabled={isSending}
              isLoading={isSending}
              type="submit"
              className="w-full"
            >
              Next <ArrowRight className="ml-2" />
            </Button>
          )}
          {step === 2 && (
            <Button
              disabled={isConfirming || !verificationCode.trim()}
              isLoading={isConfirming}
              variant="outline"
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
            <Button
              variant="outline"
              disabled={isPending}
              isLoading={isPending}
              type="submit"
              className="w-full"
            >
              Create account
            </Button>
          )}

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link className="font-semibold text-blue-600" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
