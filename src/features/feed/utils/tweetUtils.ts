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

export function collectReplies(tweet: FeedTweet): FeedTweet[] {
  const result: FeedTweet[] = [];

  if (!tweet.replies || tweet.replies.length === 0) return result;
  const sortedReplies = [...tweet.replies].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  for (const reply of sortedReplies) {
    result.push({
      ...reply,
      replies: collectReplies(reply),
    });
  }

  return result;
}

export function hasUserReply(tweet: FeedTweet, userId: string): boolean {
  if (tweet.user.id === userId) return true;
  if (!tweet.replies || tweet.replies.length === 0) return false;
  return tweet.replies.some((r) => hasUserReply(r, userId));
}

export function mapThreads(feed: FeedTweet[], userId: string) {
  const threadMap = new Map<
    string,
    { root: FeedTweet; replies: FeedTweet[] }
  >();

  [...feed]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .forEach((tweet) => {
      if (hasUserReply(tweet, userId)) {
        threadMap.set(tweet.id, {
          root: tweet,
          replies: collectReplies(tweet),
        });
      }
    });

  return threadMap;
}
