import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useFormContext } from "react-hook-form";

export default function ChoiceOptions({ index }: { index: number }) {
  const { setValue, watch } = useFormContext();
  const choices = watch(`questions.${index}.choices`) || [];

  return (
    <div className="col-span-3">
      {choices.map((choice: string, choiceIndex: number) => (
        <div key={choiceIndex} className="flex items-center space-x-2 pt-4">
          <Input
            className="w-full"
            value={choice}
            placeholder={`Вариант ${choiceIndex + 1}`}
            onChange={(e) => {
              const newChoices = [...choices];
              newChoices[choiceIndex] = e.target.value;
              setValue(`questions.${index}.choices`, newChoices);
            }}
          />
          <Button
            type="button"
            className="bg-red-500 text-white"
            onClick={() => {
              const newChoices = choices.filter((_: string, i: number) => i !== choiceIndex);
              setValue(`questions.${index}.choices`, newChoices);
            }}
          >
            ❌
          </Button>
        </div>
      ))}

      {choices.length > 0 && (
        <Button
          type="button"
          className="mt-2 bg-green-500 text-white"
          onClick={() => setValue(`questions.${index}.choices`, [...choices, ""])}
        >
          ➕ Добавить вариант
        </Button>
      )}
    </div>
  );
}
