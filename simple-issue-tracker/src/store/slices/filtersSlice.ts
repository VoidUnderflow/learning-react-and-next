import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  showOpenOnly: boolean;
  minComments: number;
}

const initialState: FiltersState = {
  showOpenOnly: true,
  minComments: 0,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setShowOpenOnly: (state, action: PayloadAction<boolean>) => {
      state.showOpenOnly = action.payload;
    },

    setMinComments: (state, action: PayloadAction<number>) => {
      state.minComments = action.payload;
    },

    resetFilters: (state) => {
      state.minComments = initialState.minComments;
      state.showOpenOnly = initialState.showOpenOnly;
    },
  },
});

export const { setShowOpenOnly, setMinComments, resetFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
