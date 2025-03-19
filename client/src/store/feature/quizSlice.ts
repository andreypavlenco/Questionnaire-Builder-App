"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModuleState {
  title: string;
  description: string;
}

const initialState: ModuleState = {
  title: "",
  description: "",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    resetQuiz() {
      return initialState;
    },
  },
});

export const { setTitle, setDescription, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
