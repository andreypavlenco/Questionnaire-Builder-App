"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AnswerOptionType = {
  id: string;
  text: string;
};

export type QuestionType = {
  text: string;
  type: "TEXT" | "CHOICE";
  options: AnswerOptionType[];
};

export type QuestionsState = {
  questions: QuestionType[];
};

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<QuestionType[]>) {
      state.questions = action.payload;
    },
    addQuestion(state, action: PayloadAction<QuestionType>) {
      state.questions.push(action.payload);
    },
    removeQuestion(state, action: PayloadAction<number>) {
      state.questions.splice(action.payload, 1);
    },
    updateQuestion(state, action: PayloadAction<{ index: number; data: Partial<QuestionType> }>) {
      const { index, data } = action.payload;
      state.questions[index] = { ...state.questions[index], ...data };
    },
    addOptionToQuestion(
      state,
      action: PayloadAction<{ index: number; option: AnswerOptionType }>
    ) {
      state.questions[action.payload.index].options.push(action.payload.option);
    },
    removeOptionFromQuestion(
      state,
      action: PayloadAction<{ index: number; optionId: string }>
    ) {
      state.questions[action.payload.index].options = state.questions[action.payload.index].options.filter(
        (option) => option.id !== action.payload.optionId
      );
    },
    resetQuestions(state) {
      state.questions = [];
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  removeQuestion,
  updateQuestion,
  addOptionToQuestion,
  removeOptionFromQuestion,
  resetQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
