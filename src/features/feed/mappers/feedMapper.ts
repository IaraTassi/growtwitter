import type { FeedTweet, FeedTweetResponse, FeedUser } from "../types";

export function mapFeedTweet(
  tweet: FeedTweetResponse,
  loggedUserId?: string,
  parentUser?: FeedUser | null,
): FeedTweet {
  const likes = tweet.likes ?? [];
  const currentReplyToUser = tweet.parent?.user ?? parentUser ?? null;

  return {
    id: tweet.id,
    content: tweet.content,
    userId: tweet.userId,
    createdAt: tweet.createdAt,
    updatedAt: tweet.updatedAt,
    user: tweet.user,
    likesCount: likes.length,
    isLiked: loggedUserId
      ? likes.some((like) => like.userId === loggedUserId)
      : false,

    repliesCount: tweet.replies?.length ?? 0,
    replyToId: tweet.parentId ?? null,
    replyToUser: currentReplyToUser,
    replies:
      tweet.replies?.map((reply) =>
        mapFeedTweet(reply, loggedUserId, tweet.user),
      ) ?? [],
  };
}

export function mapFeed(
  tweets: FeedTweetResponse[] | null | undefined,
  loggedUserId?: string,
): FeedTweet[] {
  if (!Array.isArray(tweets)) return [];
  return tweets.map((tweet) => mapFeedTweet(tweet, loggedUserId));
}
