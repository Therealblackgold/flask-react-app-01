import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    //NB: including apiSlice.reducer to the store
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  //NB: getting  getDefaultMiddleware and concatenating apiSlice.middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// NB: setupListeners to setup state refreshing at certain intervals
setupListeners(store.dispatch);
