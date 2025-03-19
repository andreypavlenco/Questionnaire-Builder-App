"use client";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { AnswerOptionType } from "@/types";

export default function ChoiceOptions({ index }: { index: number }) {
  const { setValue, watch } = useFormContext();
  const options = watch(`questions.${index}.options`) || [];

  return (
    <div className="col-span-3">
      {options.map((option: AnswerOptionType, optionIndex: number) => (
        <div key={option.id} className="flex items-center space-x-2 pt-4">
          <Input
            className="w-full"
            value={option.text}
            placeholder={`Option ${optionIndex + 1}`}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[optionIndex] = { ...newOptions[optionIndex], text: e.target.value };
              setValue(`questions.${index}.options`, newOptions);
            }}
          />
          <Button
            type="button"
            className="bg-red-500 text-white"
            onClick={() => {
              const newOptions = options.filter((_, i) => i !== optionIndex);
              setValue(`questions.${index}.options`, newOptions);
            }}
          >
            ❌
          </Button>
        </div>
      ))}

      <Button
        type="button"
        className="mt-2 bg-green-500 text-white"
        onClick={() =>
          setValue(`questions.${index}.options`, [...options, { id: uuidv4(), text: "" }])
        }
      >
        ➕ Add option
      </Button>
    </div>
  );
}
