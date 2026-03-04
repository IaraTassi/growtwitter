import type { RootState } from "../../../store/store";

export const selectFeedTweets = (state: RootState) => state.feed.tweets;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;

export const selectLikedTweets = (state: RootState) =>
  state.feed.tweets.filter((tweet) => tweet.isLiked);

export const selectReplys = (state: RootState) => {
  return state.feed.tweets.flatMap((tweet) => tweet.replies);
};
