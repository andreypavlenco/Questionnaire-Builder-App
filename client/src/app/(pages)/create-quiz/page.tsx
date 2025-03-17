"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import ModuleCreate from "./ui/create-module";
import QuestionsCreate from "./ui/create-questions";

export default function QuizCreate() {
  // const form = useForm({
  //   defaultValues: {
  //     questions: [{ text: "", type: "", choices: [""] }],
  //   },
  // });

  // const { control, handleSubmit, watch } = form;
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "questions",
  // });

  // const onSubmit = (data: any) => {
  //   console.log(data);
  // };

  return (
    <div className="container mx-auto px-20 pt-12 flex flex-col gap-10 ">
        <ModuleCreate/>
        <QuestionsCreate/>
    </div>
  );
}
