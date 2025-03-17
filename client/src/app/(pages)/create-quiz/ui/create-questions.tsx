"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { Trash } from "lucide-react";

export default function QuestionsCreate() {
  const form = useForm({
    defaultValues: {
      questions: [{ text: "", type: "", choices: [""] }],
    },
  });

  const { control, handleSubmit, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-10 not-[]:justify-center">
        {fields.map((field, index) => {
          const questionType = watch(`questions.${index}.type`);

          return (
            <div key={field.id} className="grid grid-cols-3 pt-2 gap-2">
              <FormField
                control={control}
                name={`questions.${index}.text`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="w-full" placeholder="Enter your question..." {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="Text">Text</SelectItem>
                            <SelectItem value="Choice">Choice</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-end">
                {fields.length > 1 && (
                  <Button
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white p-2"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash className="w-5 h-5" />
                  </Button>
                )}
              </div>

              <div className="col-span-2">
                {questionType === "Choice" && (
                  <FormField control={control} name={`questions.${index}.choices`} render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">Options</FormLabel>
                      <FormControl>
                        <div>
                          {field.value.map((choice, choiceIndex) => (
                            <div key={choiceIndex} className="flex items-center space-x-2 pt-4">
                              {/* <Checkbox
                                onChange={(e) => {
                                  const newChoices = e.target.checked
                                    ? [...field.value, choice]
                                    : field.value.filter((_, i) => i !== choiceIndex);
                                  field.onChange(newChoices);
                                }}
                              /> */}
                              <Input
                                value={choice}
                                onChange={(e) => {
                                  const newChoices = [...field.value];
                                  newChoices[choiceIndex] = e.target.value;
                                  field.onChange(newChoices);
                                }}
                                className="w-full"
                                placeholder={`Option ${choiceIndex + 1}`}
                              />
                              <Button
                                type="button"
                                className="bg-red-500 text-white"
                                onClick={() => {
                                  const newChoices = field.value.filter((_, i) => i !== choiceIndex);
                                  field.onChange(newChoices);
                                }}
                              >
                                ❌
                              </Button>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <Button
                        type="button"
                        className="mt-2 bg-green-500 text-white"
                        onClick={() => field.onChange([...field.value, ""])}
                      >
                        ➕ Add Option
                      </Button>
                    </FormItem>
                  )} />
                )}
              </div>
            </div>
          );
        })}

        <div className="flex gap-15 mt-4">
          <Button
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => append({ text: "", type: "", choices: [""] })}
          >
            Add Question
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
            Save Quiz
          </Button>
        </div>
      </form>
    </Form>
  );
}
