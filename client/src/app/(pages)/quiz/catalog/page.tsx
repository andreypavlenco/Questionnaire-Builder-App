"use client";

import { useQuery } from "@tanstack/react-query";
import QuizCard from "./ui/quiz-card";
import { fetchQuiz } from "@/app/api/quizApi";

export default function QuizCatalog() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["quiz"],
    queryFn: fetchQuiz,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="m-3">
      <h1 className="text-3xl mb-6">Quiz Catalog</h1>
      <QuizCard card={data} />
    </div>
  );
}
