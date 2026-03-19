import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import type { FeedTweet } from "../types";

export const selectFeedTweets = (state: RootState) => state.feed.tweets;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;

export const selectLikedTweets = createSelector(
  [
    (state: RootState) => state.feed.tweets,
    (state: RootState) => state.auth.user?.id,
  ],
  (tweets, userId) => {
    const map = new Map<string, FeedTweet>();

    const traverse = (tweet: FeedTweet) => {
      if (tweet.userId === userId && tweet.likesCount > 0) {
        map.set(tweet.id, tweet);
      }

      tweet.replies?.forEach(traverse);
    };

    tweets.forEach(traverse);

    return Array.from(map.values()).sort((a, b) => b.likesCount - a.likesCount);
  },
);

export const selectReplies = (state: RootState) =>
  state.feed.tweets.flatMap((tweet) => tweet.replies);
