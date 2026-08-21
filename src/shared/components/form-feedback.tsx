import { CircleX } from "lucide-react";
import { cn } from "../lib/tailwind-merge";



export default function FormFeedback({className, children, ...props}:React.HTMLAttributes<HTMLDivElement>) {
   if(!children) return null

    return (
        <div className={cn("text-sm border-2 text-red-600 border-red-600 bg-red-50 relative h-9.5 flex items-center justify-center" , className)} {...props}>
            <CircleX size={18} className="absolute left-1/2 bottom-2/2 translate-x-1/2 translate-y-1/2 bg-white rounded-full"/>
            {children}
            </div>
    )
}