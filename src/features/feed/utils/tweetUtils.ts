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

export function collectUserThread(
  tweet: FeedTweet,
  userId: string,
): FeedTweet | null {
  const filteredReplies = tweet.replies
    ?.map((reply) => collectUserThread(reply, userId))
    .filter(Boolean) as FeedTweet[];

  const isUserReply = tweet.user.id === userId && tweet.parentId !== null;

  if (isUserReply || filteredReplies.length > 0) {
    return {
      ...tweet,
      replies: filteredReplies,
    };
  }

  return null;
}
