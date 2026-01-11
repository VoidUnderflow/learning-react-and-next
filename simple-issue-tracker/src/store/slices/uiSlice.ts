import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
  darkMode: boolean;
}

const initialState: UIState = {
  darkMode: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
