import type { HTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/tailwind-merge";

interface HeaderHeroProps extends HTMLAttributes<HTMLHeadingElement> {
  icon?: LucideIcon;
}

export default function HeaderHero({
  icon: Icon,
  className,
  children,
  ...props
}: HeaderHeroProps) {
  return (
    <h1
      className={cn(
        "flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-4 text-2xl font-bold text-white shadow-sm md:text-3xl",
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="size-7 shrink-0" aria-hidden="true" />}
      {children}
    </h1>
  );
}