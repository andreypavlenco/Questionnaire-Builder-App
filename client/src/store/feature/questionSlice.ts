"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  text: string;
  type: string;
  choices: string[];
}

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
    addQuestion(state, action: PayloadAction<Question>) {
      state.questions.push(action.payload);
    },
    removeQuestion(state, action: PayloadAction<number>) {
      state.questions.splice(action.payload, 1);
    },
    updateQuestion(state, action: PayloadAction<{ index: number; data: Partial<Question> }>) {
      const { index, data } = action.payload;
      state.questions[index] = { ...state.questions[index], ...data };
    },
    resetQuestions(state) {
      state.questions = [];
    },
  },
});

export const { setQuestions, addQuestion, removeQuestion, updateQuestion, resetQuestions } =
  questionsSlice.actions;
export default questionsSlice.reducer;
