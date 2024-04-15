import { configureStore } from "@reduxjs/toolkit";
import tablePaginationReducer from "./paginationSlice";

export const store = configureStore({
  reducer: {
    pagination: tablePaginationReducer,
  },
});
