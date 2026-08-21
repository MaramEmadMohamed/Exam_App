import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/shared/lib/tailwind-merge"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // Layout and sizing
        "h-11.5 w-full min-w-0",
        // Border, background, and spacing
        "border border-input hover:border-blue-500 bg-transparent px-3 py-1",
        // Typography
        "text-base",
        // Interaction and browser defaults
        "transition-colors outline-none",
        // File input styles
        "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Placeholder and focus states
        "placeholder:text-gray-400 focus-visible:border-blue-500 focus-visible:ring-3 focus-visible:ring-blue-400/50",
        // Disabled and validation states
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-gray-200 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        // Responsive and dark mode styles
        "md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
