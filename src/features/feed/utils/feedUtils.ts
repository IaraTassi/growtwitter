import type { FeedTweet } from "../types";

export function updateLikeRecursive(tweet: FeedTweet, id: string): FeedTweet {
  if (tweet.id === id) {
    const newIsLiked = !tweet.isLiked;

    return {
      ...tweet,
      isLiked: newIsLiked,
      likesCount: newIsLiked ? tweet.likesCount + 1 : tweet.likesCount - 1,
    };
  }

  return {
    ...tweet,
    replies: tweet.replies.map((reply) => updateLikeRecursive(reply, id)),
  };
}

export function insertReplyRecursive(
  tweet: FeedTweet,
  reply: FeedTweet,
): FeedTweet {
  if (tweet.id === reply.replyToId) {
    return {
      ...tweet,
      replies: [...tweet.replies, reply],
      repliesCount: tweet.repliesCount + 1,
    };
  }

  return {
    ...tweet,
    replies: tweet.replies.map((r) => insertReplyRecursive(r, reply)),
  };
}
