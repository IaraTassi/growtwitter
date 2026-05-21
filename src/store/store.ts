import feedReducer from "../../src/features/feed/store/feedSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/features/auth/store/authSlice";
import { loadAuth } from "../features/auth/store/authStorage";

const persistedAuth = loadAuth();

const preloadedState = {
  auth: {
    user: persistedAuth.user,
    token: persistedAuth.token,
    loading: false,
    error: null,
    hydrated: true,
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
