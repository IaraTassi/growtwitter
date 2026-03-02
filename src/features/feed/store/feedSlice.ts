import { createSlice } from "@reduxjs/toolkit";
import type { FeedState } from "../types";
import { fetchFeed, toggleLikeThunk } from "./feedThunks";
import { updateLikeRecursive } from "../utils/feedUtils";

const initialState: FeedState = {
  tweets: [],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleLikeThunk.pending, (state, action) => {
        state.tweets = state.tweets.map((tweet) =>
          updateLikeRecursive(tweet, action.meta.arg),
        );
      })
      .addCase(toggleLikeThunk.fulfilled, () => {})
      .addCase(toggleLikeThunk.rejected, (state, action) => {
        if (action.meta.arg) {
          state.tweets = state.tweets.map((tweet) =>
            updateLikeRecursive(tweet, action.meta.arg),
          );
        }
        state.error = action.payload as string;
      });
  },
});

export default feedSlice.reducer;
