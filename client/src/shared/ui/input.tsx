import * as React from "react"

import { cn } from "@/shared/lib/css"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 border-0 border-b-2 border-muted bg-transparent px-3 py-1 shadow-xs transition-[border-color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:border-b-white focus-visible:ring-0",
        "aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
