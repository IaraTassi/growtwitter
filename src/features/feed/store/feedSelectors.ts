import type { RootState } from "../../../store/store";

export const selectFeedTweets = (state: RootState) => state.feed.tweets;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;
