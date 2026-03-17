import { createSlice } from "@reduxjs/toolkit";
import type { FeedState } from "../types";
import {
  createReplyThunk,
  createTweetThunk,
  fetchFeed,
  toggleLikeThunk,
} from "./feedThunks";
import { insertReplyRecursive, updateLikeRecursive } from "../utils/feedUtils";
import { removeTweetRecursive } from "../utils/tweetUtils";

const initialState: FeedState = {
  tweets: [],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    removeTweet: (state, action) => {
      const tweetId = action.payload;

      state.tweets = state.tweets
        .filter((tweet) => tweet.id !== tweetId)
        .map((tweet) => removeTweetRecursive(tweet, tweetId));
    },
  },
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
      })
      .addCase(createReplyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReplyThunk.fulfilled, (state, action) => {
        state.loading = false;
        const reply = action.payload;
        state.tweets = state.tweets.map((tweet) =>
          insertReplyRecursive(tweet, reply),
        );
      })
      .addCase(createReplyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTweetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTweetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets.unshift({
          ...action.payload,
          replies: [],
        });
      })
      .addCase(createTweetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeTweet } = feedSlice.actions;

export default feedSlice.reducer;
