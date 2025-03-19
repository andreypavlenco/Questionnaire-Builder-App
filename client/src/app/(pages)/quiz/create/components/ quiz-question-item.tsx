import { FormField, FormItem, FormControl, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import ChoiceOptions from "./choice-options";

export default function QuizQuestionItem({
  index,
  remove,
}: {
  index: number;
  remove: (index: number) => void;
}) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const questionType = watch(`questions.${index}.type`);

   return (
    <div className="grid grid-cols-3 pt-2 gap-2">
      <FormField
        control={control}
        name={`questions.${index}.text`}
        rules={{ required: "This field is required!" }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                className={`w-full ${errors?.questions?.[index]?.text ? "border-red-500" : "border-gray-500"}`}
                placeholder="Enter the question..."
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
                  setValue(`questions.${index}.choices`, value === "CHOICE" ? [""] : []);
                }}
                value={field.value || "TEXT"}
              >
                <SelectTrigger className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500">
                  {field.value || "Select type"}
                </SelectTrigger>
                <SelectContent className="bg-gray-900 text-white border border-gray-700 rounded-md">
                  <SelectGroup>
                    {["TEXT", "CHOICE"].map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="px-4 py-2 hover:bg-gray-700"
                      >
                        {option}
                      </SelectItem>
                    ))}
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
        <Trash className="w-5 h-5" /> Remove
      </Button>

      {questionType === "CHOICE" && <ChoiceOptions index={index} />}
    </div>
  );
}
