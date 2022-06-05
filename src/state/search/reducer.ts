import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "../types";

export const fetchBooks = createAsyncThunk("search/fetchData", async (query: string) => {
  const result = await axios
    .get("https://www.googleapis.com/books/v1/volumes", {
      params: { q: query, key: process.env.GOOGLE_API_KEY },
    })
    .then((result) => {
      return result.data.items.map((item: any) => ({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors[0],
        publisher: item.volumeInfo.publisher ?? "No publisher",
        id: item.id,
      }));
    });
  return result;
});

export interface SearchState {
  books: Book[];
  query: string;
}

export const initialState: SearchState = {
  books: [],
  query: "",
};

const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.books = action.payload.slice(0, 5);
    });
  },
});

export const { updateQuery } = search.actions;

export default search.reducer;
