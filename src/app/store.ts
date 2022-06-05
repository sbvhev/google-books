import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { save, load } from "redux-localstorage-simple";

import searchReduer from "../state/search/reducer";

const PERSISTED_KEYS: string[] = ["list"];

export const store = configureStore({
  reducer: {
    search: searchReduer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({ states: PERSISTED_KEYS }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<any>>;
