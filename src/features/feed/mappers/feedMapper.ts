import type { FeedTweet, FeedTweetResponse } from "../types";

export function mapFeedTweet(tweet: FeedTweetResponse): FeedTweet {
  return {
    id: tweet.id,
    content: tweet.content,
    userId: tweet.userId,
    createdAt: tweet.createdAt,
    updatedAt: tweet.updatedAt,
    user: tweet.user,
    likesCount: tweet.likes?.length ?? 0,
    repliesCount: tweet.replies?.length ?? 0,
    replyToId: tweet.parentId ?? null,
    replyToUser: tweet.parent?.user ?? null,
    replies: tweet.replies?.map(mapFeedTweet) ?? [],
  };
}

export function mapFeed(tweets: FeedTweetResponse[]): FeedTweet[] {
  return tweets.map(mapFeedTweet);
}
