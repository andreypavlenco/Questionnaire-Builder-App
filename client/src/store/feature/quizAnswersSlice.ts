import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Answer = {
  questionId: string;
  answerText?: string; // Для текстовых ответов
  selectedOptions?: string[]; // Для вариантов (checkbox)
};

type QuizAnswersState = {
  answers: Answer[];
};

const initialState: QuizAnswersState = {
  answers: [],
};

export const quizAnswersSlice = createSlice({
  name: "quizAnswers",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<Answer>) => {
      const existingIndex = state.answers.findIndex(
        (a) => a.questionId === action.payload.questionId
      );

      if (existingIndex !== -1) {
        state.answers[existingIndex] = action.payload; 
      } else {
        state.answers.push(action.payload); 
      }
    },
    resetAnswers: (state) => {
      state.answers = [];
    },
  },
});

export const { setAnswer, resetAnswers } = quizAnswersSlice.actions;
export default quizAnswersSlice.reducer;
