import { configureStore } from "@reduxjs/toolkit";
import moduleReducer from "./feature/moduleSlice";
import questionReducer from "./feature/questionSlice";

export const store = configureStore({
  reducer: {
    questions: questionReducer,
    module: moduleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
