"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTitle, setDescription, resetQuiz } from "@/store/feature/quizSlice";
import { resetQuestions, setQuestions } from "@/store/feature/questionSlice";
import { Button } from "@/shared/ui/button";
import QuizForm from "./components/quiz-form";
import QuizQuestionList from "./components/quiz-question-list";
import { QuestionType, QuizType } from "@/types";
import { useCreateQuizMutation } from "@/app/api/quizApi";

export default function QuizCreate() {
  const dispatch = useDispatch();
  const quizState = useSelector((state: RootState) => state.quiz);
  const questions = useSelector((state: RootState) => state.questions.questions);

  const form = useForm({
    defaultValues: {
      title: quizState.title || "",
      description: quizState.description || "",
      questions,
    },
    mode: "onBlur",
  });

  const { handleSubmit, watch, reset } = form;

  const isFormValid = () => {
    return (
      watch("questions").every(
        (q) =>
          q.text.trim() && (q.type !== "CHOICE" || (q.options && q.options.every((opt) => opt.text.trim()))),
      ) &&
      watch("title").trim() &&
      watch("description").trim()
    );
  };

  const createQuizMutation = useCreateQuizMutation();

  const onSubmit = (data: QuizType) => {
   console.log(data)
    if (!isFormValid()) {
      console.log("❌ Please fill in all required fields!");
      return;
    }

    const transformedData: QuizType = {
      ...data,
      questions: data.questions.map((q) => ({
        ...q,
        options: (q.options || []).map((option) => ({ text: option.text })),
      })),
    };
    
    console.log("📌 Sending quiz data to backend:", transformedData);

    createQuizMutation.mutate(transformedData, {
      onSuccess: (responseData) => {
        console.log("✅ Quiz created successfully:", responseData);
        dispatch(resetQuiz());
        dispatch(resetQuestions());

        reset({
          title: "",
          description: "",
          questions: [],
        });
      },
      onError: (error) => {
        console.error("❌ Error creating quiz:", error);
      },
    });
  };

  return (
    <FormProvider {...form}>
      <div className="container mx-auto px-20 pt-12 flex flex-col gap-10">
        <QuizForm />
        <QuizQuestionList />
        <Button
          onClick={handleSubmit(onSubmit)}
          className="border border-gray-500 text-white px-4 py-2 rounded-md"
          disabled={!isFormValid()}
        >
          Create
        </Button>
      </div>
    </FormProvider>
  );
}
