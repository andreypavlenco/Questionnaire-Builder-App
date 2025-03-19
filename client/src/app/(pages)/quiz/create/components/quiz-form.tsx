"use client";

import { FormField, FormItem, FormControl, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useFormContext } from "react-hook-form";

export default function QuizForm() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Create a new quiz</h1>
      </div>

      <form className="grid gap-4">
        <FormField
          control={control}
          name="title"
          rules={{ required: "This field is required!" }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={`border p-3 rounded-md ${errors.title ? "border-red-500" : "border-gray-500"}`}
                  placeholder="Quiz title..."
                  {...field}
                  onChange={(e) => setValue("title", e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          rules={{ required: "This field is required!" }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={`border p-3 rounded-md ${errors.description ? "border-red-500" : "border-gray-500"}`}
                  placeholder="Description..."
                  {...field}
                  onChange={(e) => setValue("description", e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </div>
  );
}
