import { Button } from "@/shared/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import QuestionItem from "./questionItem";

export default function QuestionList() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "questions" });

  return (
    <div className="grid w-full gap-10">
      {fields.map((field, index) => (
        <QuestionItem key={field.id} index={index} remove={remove} />
      ))}

      <Button
        type="button"
        className="bg-green-500 hover:bg-green-600 text-white mt-4"
        onClick={() => append({ text: "", type: "Text", choices: [] })}
      >
        ➕ Добавить вопрос
      </Button>
    </div>
  );
}
