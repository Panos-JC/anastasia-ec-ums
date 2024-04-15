import { createSlice } from "@reduxjs/toolkit";

// Set initial state of the table (just copied all variables using useState)
const initialState = {
  currentPage: 1,
  recordsPerPage: 10,
  totalPages: 1,
};

// Create slice for pagination functionality
export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    // Sets the current page (specific page, next or previous)
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    // Sets the records per page
    setRecordsPerPage: (state, action) => {
      state.recordsPerPage = action.payload;
    },
    // Sets total pages
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setCurrentPage, setRecordsPerPage, setTotalPages } =
  paginationSlice.actions;
export default paginationSlice.reducer;
