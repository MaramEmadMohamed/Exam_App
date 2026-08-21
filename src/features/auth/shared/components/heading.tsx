import { cn } from "@/shared/lib/tailwind-merge";

export default function Heading({className , ...props}:React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("text-3xl font-bold font-heading" , className)}{...props} /> )
}
