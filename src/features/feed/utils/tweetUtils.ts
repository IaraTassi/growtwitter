import type { FeedTweet } from "../types";

export function removeTweetRecursive(
  tweet: FeedTweet,
  tweetId: string,
): FeedTweet {
  return {
    ...tweet,
    replies: tweet.replies
      .filter((reply) => reply.id !== tweetId)
      .map((reply) => removeTweetRecursive(reply, tweetId)),
  };
}
