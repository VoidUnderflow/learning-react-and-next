import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SelectionSlice {
  selectedIssueId: number | null;
}

const initialState: SelectionSlice = { selectedIssueId: null };

export const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    selectIssue: (state, action: PayloadAction<number>) => {
      state.selectedIssueId = action.payload;
    },

    clearSelection: (state) => {
      state.selectedIssueId = null;
    },
  },
});

export const { selectIssue, clearSelection } = selectionSlice.actions;
export default selectionSlice.reducer;
