import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./feature/questionSlice";
import quizReducer from "./feature/quizSlice";
import  quizAnswersReducer from './feature/quizAnswersSlice'

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    quiz: quizReducer,
    quizAnswers: quizAnswersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
