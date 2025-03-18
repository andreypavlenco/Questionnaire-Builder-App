"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setModule, setDescription, resetModule } from "@/store/feature/moduleSlice";
import {resetQuestions, setQuestions} from "@/store/feature/questionSlice"
import { Button } from "@/shared/ui/button";
import ModuleForm from "./components/moduleForm";
import QuestionList from "./components/questionList";

export default function QuizCreate() {
  const dispatch = useDispatch();
  const moduleState = useSelector((state: RootState) => state.module);
  const questions = useSelector((state: RootState) => state.questions.questions);

  const form = useForm({
    defaultValues: {
      module: moduleState.module || "",
      description: moduleState.description || "",
      questions,
    },
    mode: "onBlur",
  });

  const { handleSubmit, watch, reset } = form;

  const isFormValid = () => {
    return (
      watch("questions").every(
        (q) => q.text.trim() && (q.type !== "Choice" || (q.choices && q.choices.every((c) => c.trim())))
      ) &&
      watch("module").trim() &&
      watch("description").trim()
    );
  };

  const onSubmit = (data: any) => {
    if (!isFormValid()) {
      console.log("❌ Заполните все поля!");
      return;
    }
  
    console.log("📌 Сохранение модуля и вопросов:", data);
  
    dispatch(setModule(data.module));
    dispatch(setDescription(data.description));
  
    dispatch(setQuestions(
      data.questions.map((q: any) => ({
        ...q,
        choices: q.choices.filter((choice: string) => choice.trim() !== ""),
      }))
    ));
  
    dispatch(resetModule());
    dispatch(resetQuestions()); 
  
  reset({
    module: "",
    description: "",
    questions: [],
  });

  };

  return (
    <FormProvider {...form}>
      <div className="container mx-auto px-20 pt-12 flex flex-col gap-10">
        <ModuleForm />
        <QuestionList />
        <Button
          onClick={handleSubmit(onSubmit)}
          className="border border-gray-500 text-white px-4 py-2 rounded-md"
          disabled={!isFormValid()}
        >
          Создать
        </Button>
      </div>
    </FormProvider>
  );
}
