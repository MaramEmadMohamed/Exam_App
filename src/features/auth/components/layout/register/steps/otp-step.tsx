import { useFormContext } from "react-hook-form";
import type { IRegisterFormValues } from "@/features/auth/components/layout/register/form/types/register";
import { Button } from "@/ui/button/button";
import { Field, FieldLabel } from "@/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/ui/input-otp";

interface OtpStepProps {
  verificationCode: string;
  onVerificationCodeChange: (code: string) => void;
  secondsRemaining: number;
  isSending: boolean;
  onResend: () => void;
}

const otpSlotClassName =
  "size-11 rounded-md border-2 border-slate-300 bg-white text-lg font-semibold shadow-sm transition-all duration-200 data-[active=true]:border-blue-500 data-[active=true]:bg-blue-50 data-[active=true]:shadow-[0_0_0_4px_rgba(59,130,246,0.18)]";

export default function OtpStep({
  verificationCode,
  onVerificationCodeChange,
  secondsRemaining,
  isSending,
  onResend,
}: OtpStepProps) {
  const { getValues } = useFormContext<IRegisterFormValues>();

  return (
    <div className="flex flex-col gap-4 sm:col-span-2">
      <span className="font-bold text-blue-600 font-heading">Verify OTP</span>
      <p className="text-sm text-slate-500">
        Please enter the 6-digit code we have sent to :
        <span className="text-gray-900">{getValues("email")}</span>.
      </p>
      <Field>
        <FieldLabel htmlFor="verificationCode" className="sr-only">
          Verification code
        </FieldLabel>
        <InputOTP
          maxLength={6}
          inputMode="numeric"
          value={verificationCode}
          onChange={onVerificationCodeChange}
          aria-label="Verification code"
        >
          <InputOTPGroup className="flex items-center gap-2">
            {Array.from({ length: 6 }, (_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className={otpSlotClassName}
              />
            ))}
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
            onClick={onResend}
          >
            Resend code
          </Button>
        </div>
      </Field>
    </div>
  );
}
