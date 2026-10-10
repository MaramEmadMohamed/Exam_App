import { useFormContext } from "react-hook-form";
import type { IRegisterFormValues } from "@/features/auth/components/layout/register/form/types/register";
import { useRegisterWithErrorRevalidation } from "@/features/auth/hooks/use-register-with-error-revalidation";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input/input";
import { COUNTRY_CODES } from "@/features/auth/constants/country-codes";

interface PersonalDetailsStepProps {
  countryCode: string;
  onCountryCodeChange: (countryCode: string) => void;
}

function RequiredMark() {
  return <span className="text-red-500">*</span>;
}

export default function PersonalDetailsStep({
  countryCode,
  onCountryCodeChange,
}: PersonalDetailsStepProps) {
  const {
    formState: { errors },
  } = useFormContext<IRegisterFormValues>();
  const registerWithErrorRevalidation =
    useRegisterWithErrorRevalidation<IRegisterFormValues>();

  return (
    <FieldGroup className="sm:col-span-2">
      <h2 className="text-2xl font-semibold text-blue-600">
        Tell us more about you
      </h2>

      {/* First name + Last name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="firstName">
            First name <RequiredMark />
          </FieldLabel>
          <Input
            id="firstName"
            required
            placeholder="Ahmed"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            {...registerWithErrorRevalidation("firstName")}
          />
          <FieldError id="firstName-error">
            {errors.firstName?.message}
          </FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="lastName">
            Last name <RequiredMark />
          </FieldLabel>
          <Input
            id="lastName"
            required
            placeholder="Abdullah"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            {...registerWithErrorRevalidation("lastName")}
          />
          <FieldError id="lastName-error">
            {errors.lastName?.message}
          </FieldError>
        </Field>
      </div>

      {/* Username (full width) */}
      <Field>
        <FieldLabel htmlFor="username">
          Username <RequiredMark />
        </FieldLabel>
        <Input
          id="username"
          required
          placeholder="user123"
          autoComplete="username"
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? "username-error" : undefined}
          {...registerWithErrorRevalidation("username")}
        />
        <FieldError id="username-error">{errors.username?.message}</FieldError>
      </Field>

      {/* Phone (full width, select + input group) */}
      <Field>
        <FieldLabel htmlFor="phone">
          Phone <RequiredMark />
        </FieldLabel>
        <div
          className={`flex items-center border bg-background transition-colors focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-400/50 ${
            errors.phone ? "border-red-500" : "border-input"
          }`}
        >
          <select
            aria-label="Country calling code"
            aria-invalid={!!errors.phone}
            value={countryCode}
            onChange={(event) => onCountryCodeChange(event.target.value)}
            className="h-11.5 w-32 shrink-0 bg-transparent px-3 text-sm outline-none"
          >
            {COUNTRY_CODES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <input
            id="phone"
            required
            type="tel"
            autoComplete="tel-national"
            placeholder="1012345678"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="h-11.5 min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-gray-400"
            {...registerWithErrorRevalidation("phone")}
          />
        </div>
        <FieldError id="phone-error">{errors.phone?.message}</FieldError>
      </Field>
    </FieldGroup>
  );
}