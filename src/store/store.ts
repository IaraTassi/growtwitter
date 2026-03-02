import feedReducer from "../../src/features/feed/store/feedSlice";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/features/auth/store/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
