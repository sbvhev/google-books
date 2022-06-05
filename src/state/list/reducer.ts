import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types";

export interface ReducerState {
  books: Book[];
}

export const initialState: ReducerState = {
  books: [],
};

const list = createSlice({
  name: "list",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books = [...state.books, action.payload];
    },
  },
});

export const { addBook } = list.actions;
export default list.reducer;
