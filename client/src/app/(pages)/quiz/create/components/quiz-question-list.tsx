import { Button } from "@/shared/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import QuizQuestionItem from "./ quiz-question-item";


export default function QuizQuestionList() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "questions" });

  return (
    <div className="grid w-full gap-10">
      {fields.map((field, index) => (
        <QuizQuestionItem key={field.id} index={index} remove={remove} />
      ))}

      {/* Кнопка добавления вопроса (разрешена и при создании, и при обновлении) */}
      <Button
        type="button"
        className="bg-green-500 hover:bg-green-600 text-white mt-4"
        onClick={() =>
          append({
            id: `q-${Date.now()}`, // Генерируем уникальный ID
            text: "",
            type: "TEXT",
            options: [],
          })
        }
      >
        ➕ Add question
      </Button>
    </div>
  );
}
