import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/tailwind-merge"
import { buttonVariants } from "./varients"
import { Loader } from "lucide-react";

interface IButtonProps extends ButtonPrimitive.Props, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  children,
  disabled,
  ...props
}: IButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={isLoading || disabled}
      className={cn(buttonVariants({ variant, size, className }))} {...props}>
        {isLoading ? <Loader className="mr-2 animate-spin"/> : children}
      </ButtonPrimitive>
  )
}

