import type { FeedTweet, FeedTweetResponse } from "../types";

export function mapFeedTweet(
  tweet: FeedTweetResponse,
  loggedUserId?: string,
): FeedTweet {
  const likes = tweet.likes ?? [];

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
    replyToUser: tweet.parent?.user ?? null,
    replies:
      tweet.replies?.map((reply) => mapFeedTweet(reply, loggedUserId)) ?? [],
  };
}

export function mapFeed(
  tweets: FeedTweetResponse[],
  loggedUserId?: string,
): FeedTweet[] {
  return tweets.map((tweet) => mapFeedTweet(tweet, loggedUserId));
}
