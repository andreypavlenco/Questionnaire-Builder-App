"use client";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export default function ModuleCreate() {
  const form = useForm({
    defaultValues: {
      module: "",
      description: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Создать новый модуль</h1>
        <div className="flex gap-2">
          <Button className="border border-gray-500 text-white px-4 py-2 rounded-md">
            Создать
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 border-gray-500 text-white px-4 py-2 rounded-md">
            Создать и практиковать
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={control}
            name="module"
            render={({ field }) => (
              <FormItem >
                <FormControl>
                  <Input
                   className="text-base  bg-[#2e3856] border border-[#2e3856] rounded-md p-3"
                    placeholder='Введите название, например, "Биология. Фотосинтез и хемосинтез"'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem >
                <FormControl>
                  <Input
                    className="text-base  bg-[#2e3856] border border-[#2e3856] rounded-md p-3"
                    placeholder="Добавьте описание..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
