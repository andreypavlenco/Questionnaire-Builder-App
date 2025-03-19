"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { QuizType } from "@/types";
import { useUpdateQuizMutation, useGetQuizByIdQuery } from "@/app/api/quizApi";
import QuizForm from "../../create/components/quiz-form";
import QuizQuestionList from "../../create/components/quiz-question-list";


export default function QuizUpdate() {
  const params = useParams();
  const quizId = params.id as string;
  const router = useRouter();
  
  const { data: quizData, isLoading } = useGetQuizByIdQuery(quizId, {
    enabled: !!quizId,
  });

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  // Создаём форму
  const form = useForm({
    defaultValues: {
      title: quizData?.title || "",
      description: quizData?.description || "",
      questions: quizData?.questions || [],
    },
    mode: "onBlur",
    key: quizData?.id,
  });

  const { handleSubmit, watch, reset, control } = form;

  const { fields: questionFields, append: addQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: "questions",
  });

  const isFormValid = () => {
    return (
      watch("questions").every(
        (q) =>
          q.text.trim() &&
          (q.type !== "CHOICE" || (q.options && q.options.every((opt) => opt.text.trim())))
      ) &&
      watch("title").trim() &&
      watch("description").trim()
    );
  };

  const updateQuizMutation = useUpdateQuizMutation();

  const onSubmit = (data: QuizType) => {
    if (!isFormValid()) {
      console.log("❌ Please fill in all required fields!");
      return;
    }
    const transformedData: QuizType = {
      ...data,
      id: quizId,
      questions: data.questions.map((q) => ({
        ...q,
        options: (q.options || []).map((option) => ({
          id: option.id || `opt-${q.id}-${Math.random().toString(36).substring(7)}`,
          text: option.text,
        })),
      })),
    };
  
    updateQuizMutation.mutate(transformedData, {
      onSettled: () => {
        handleNavigate("/quiz/catalog");
      },
      onError: (error) => {
        console.error("❌ Error updating quiz:", error);
      },
    });
  };

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <FormProvider {...form}>
      <div className="container mx-auto max-w-2xl px-6 pt-12 flex flex-col gap-6 bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Edit Quiz</h2>
        <QuizForm />
        <QuizQuestionList />
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition"
          disabled={!isFormValid()}
        >
          Update
        </Button>
      </div>
    </FormProvider>
  );
}
