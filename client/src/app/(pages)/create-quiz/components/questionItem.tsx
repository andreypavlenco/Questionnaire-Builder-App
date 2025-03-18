import { FormField, FormItem, FormControl, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import ChoiceOptions from "./choiceOptions";

export default function QuestionItem({ index, remove }: { index: number; remove: (index: number) => void }) {
  const { control, setValue, watch, formState: { errors } } = useFormContext();
  const questionType = watch(`questions.${index}.type`);

  return (
    <div className="grid grid-cols-3 pt-2 gap-2">
      <FormField
        control={control}
        name={`questions.${index}.text`}
        rules={{ required: "Обязательно заполнить поле!" }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                className={`w-full ${errors?.questions?.[index]?.text ? "border-red-500" : "border-gray-500"}`}
                placeholder="Введите вопрос..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`questions.${index}.type`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  setValue(`questions.${index}.type`, value);
                  setValue(`questions.${index}.choices`, value === "Choice" ? [""] : []);
                }}
                value={field.value || "Text"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Text">Текст</SelectItem>
                    <SelectItem value="Choice">Выбор</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="button"
        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md flex items-center gap-2"
        onClick={() => remove(index)}
      >
        <Trash className="w-5 h-5" /> Удалить
      </Button>

      {questionType === "Choice" && <ChoiceOptions index={index} />}
    </div>
  );
}
