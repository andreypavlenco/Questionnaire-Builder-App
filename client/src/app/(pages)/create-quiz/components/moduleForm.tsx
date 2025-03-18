"use client";

import {  FormField, FormItem, FormControl, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { useFormContext } from "react-hook-form";

export default function ModuleForm() {
  const { control, setValue, formState: { errors } } = useFormContext();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Создать новый модуль</h1>
      </div>

      <form className="grid gap-4">
        <FormField
          control={control}
          name="module"
          rules={{ required: "Обязательно заполнить поле!" }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={`border p-3 rounded-md ${errors.module ? "border-red-500" : "border-gray-500"}`}
                  placeholder="Название модуля..."
                  {...field}
                  onChange={(e) => setValue("module", e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          rules={{ required: "Обязательно заполнить поле!" }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={`border p-3 rounded-md ${errors.description ? "border-red-500" : "border-gray-500"}`}
                  placeholder="Описание..."
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
