"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModuleState {
  module: string;
  description: string;
}

const initialState: ModuleState = {
  module: "",
  description: "",
};

const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setModule(state, action: PayloadAction<string>) {
      state.module = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    resetModule() {
      return initialState;
    },
  },
});

export const { setModule, setDescription, resetModule } = moduleSlice.actions;
export default moduleSlice.reducer;
