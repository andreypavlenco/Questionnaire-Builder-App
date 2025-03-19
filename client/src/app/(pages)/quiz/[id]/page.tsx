"use client";

import { fetchQuizById } from "@/app/api/quizApi";
import { Input } from "@/shared/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAnswer, resetAnswers } from "@/store/feature/quizAnswersSlice";
import { QuizType, QuestionType, AnswerOptionType } from "@/types";
import { Checkbox } from "@/shared/ui/checkbox";

export default function QuizPage() {
  const params = useParams();
  const quizId = params.id as string;
  const dispatch = useDispatch();
  const answers = useSelector((state: RootState) => state.quizAnswers.answers);

  const { data, isLoading, error } = useQuery<QuizType>({
    queryKey: ["quiz", quizId],
    queryFn: () => fetchQuizById(quizId),
    enabled: !!quizId,
  });

  if (isLoading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!data || !data.questions || data.questions.length === 0) {
    return <div className="text-center text-gray-400">No questions found.</div>;
  }

  const handleTextChange = (questionId: string, value: string) => {
    dispatch(setAnswer({ questionId, answerText: value }));
  };

  
  const handleOptionChange = (questionId: string, optionId: string, checked: boolean) => {
    const existingAnswer = answers.find((a) => a.questionId === questionId);
    const updatedOptions = checked
      ? [...(existingAnswer?.selectedOptions || []), optionId]
      : (existingAnswer?.selectedOptions || []).filter((id) => id !== optionId);

    dispatch(setAnswer({ questionId, selectedOptions: updatedOptions }));
  };

  const handleSubmit = () => {
    console.log("📌 Ответы:", answers);
    dispatch(resetAnswers());
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{data.title}</h1>

      {data.questions
  .filter((question) => question.text?.trim() !== "" && question.id)
  .map((question: QuestionType, index: number) => (
    <div key={question.id} className="mb-6 border-b border-gray-700 pb-4">
      <p className="text-lg font-semibold mb-2">
        {index + 1}. {question.text}
      </p>

      {question.type === "TEXT" && (
        <Input
          type="text"
          className="border p-2 w-full mb-4 text-black bg-white rounded"
          value={answers.find((a) => a.questionId === question.id)?.answerText || ""}
          onChange={(e) => handleTextChange(question.id, e.target.value)}
        />
      )}

      {question.type === "CHOICE" && question.options.length > 0 && (
        <div className="flex flex-col space-y-2">
          {question.options.map((option: AnswerOptionType) => {
            const isChecked =
              answers.find((a) => a.questionId === question.id)?.selectedOptions?.includes(option.id) || false;

            return (
              <label key={option.id} className="flex items-center space-x-2 bg-gray-800 p-2 rounded-md">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked) => handleOptionChange(question.id, option.id, checked)}
                  className="h-5 w-5 border border-gray-500 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-200">{option.text}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  ))}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-3 mt-4 rounded-md hover:bg-blue-600 transition"
      >
        Submit Quiz
      </button>
    </div>
  );
}
