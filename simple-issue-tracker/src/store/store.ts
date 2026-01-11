import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./slices/filtersSlice";
import selectionReducer from "./slices/selectionSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    selection: selectionReducer,
    ui: uiReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
