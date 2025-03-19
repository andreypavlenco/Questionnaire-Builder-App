// api/quizApi.ts
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QuizType } from '@/types';

export async function createQuiz(quizData: QuizType) {
  const response = await axios.post("http://localhost:8080/quiz", quizData);
  return response.data;
}

export async function fetchQuiz() {
  const response = await axios.get("http://localhost:8080/quiz");
  return response.data;
}

export async function fetchQuizById(id: string) {
  const response = await axios.get(`http://localhost:8080/quiz/${id}`);
  return response.data;
}

export function useCreateQuizMutation() {
  return useMutation({
    mutationFn: async (quizData: QuizType) => {
      const response = await axios.post("http://localhost:8080/quiz", quizData);
      return response.data;
    }
  });
}

export function useDeleteQuizMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`http://localhost:8080/quiz/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz'] });
    },
  });
}



export const useGetQuizByIdQuery = (quizId: string, options?: object) => {
  return useQuery<QuizType>({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8080/quiz/${quizId}`);
      return response.data;
    },
    ...options,
  });
};

export const useUpdateQuizMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<QuizType, Error, QuizType>({
    mutationFn: async (quiz: QuizType) => {
      try {
        console.log("📌 Sending update request:", quiz);
        const { data } = await axios.put(`http://localhost:8080/quiz/${quiz.id}`, quiz);
        return data;
      } catch (error: any) {
        console.error("❌ API Error updating quiz:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update quiz");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
    },
    onError: (error) => {
      console.error("❌ Mutation error:", error.message);
    },
  });
};
