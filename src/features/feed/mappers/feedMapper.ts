import type { FeedTweet, FeedTweetResponse } from "../types";

export function mapFeedTweet(
  tweet: FeedTweetResponse,
  loggedUserId?: string,
): FeedTweet {
  const likes = Array.isArray(tweet.likes) ? tweet.likes : [];

  return {
    id: tweet.id,
    content: tweet.content,
    userId: tweet.userId,
    parentId: tweet.parentId ?? null,
    createdAt: tweet.createdAt,
    updatedAt: tweet.updatedAt,
    user: tweet.user,
    likesCount: likes.length,
    isLiked: loggedUserId
      ? likes.some((like) => like.userId === loggedUserId)
      : false,

    repliesCount: tweet.replies?.length ?? 0,
    replies:
      tweet.replies?.map((reply) => mapFeedTweet(reply, loggedUserId)) ?? [],
  };
}

export function mapFeed(
  tweets: FeedTweetResponse[] | null | undefined,
  loggedUserId?: string,
): FeedTweet[] {
  if (!Array.isArray(tweets)) return [];
  return tweets.map((tweet) => mapFeedTweet(tweet, loggedUserId));
}
