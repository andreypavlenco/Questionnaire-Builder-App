"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/shared/lib/css";

function Checkbox({
  className,
  checked,
  onCheckedChange,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer flex h-5 w-5 items-center justify-center border border-gray-500 rounded-md bg-gray-800 hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition",
        className
      )}
      checked={checked}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      {/* Закрываем тег Indicator правильно */}
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon className="w-4 h-4 text-white" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
