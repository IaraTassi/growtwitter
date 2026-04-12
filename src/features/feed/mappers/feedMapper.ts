import type { FeedTweet, FeedTweetResponse, FeedUser } from "../types";

export function mapFeedTweet(
  tweet: FeedTweetResponse,
  loggedUserId?: string,
  parentUser?: FeedUser | null,
): FeedTweet {
  const likes = tweet.likes ?? [];

  const safeUser: FeedUser = tweet.user ??
    parentUser ?? {
      id: tweet.userId,
      name: "Usuário",
      userName: "unknown",
      email: "",
      imageUrl: null,
      createdAt: tweet.createdAt,
      updatedAt: tweet.updatedAt,
    };

  const replyToUser = parentUser ?? null;

  const sortedReplies = [...(tweet.replies ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    id: tweet.id,
    content: tweet.content,
    userId: tweet.userId ?? safeUser.id,
    parentId: tweet.parentId ?? null,
    createdAt: tweet.createdAt,
    updatedAt: tweet.updatedAt,
    user: safeUser,
    likesCount: likes.length,
    isLiked: loggedUserId
      ? likes.some((like) => like.userId === loggedUserId)
      : false,

    repliesCount: tweet.replies?.length ?? 0,
    replyToId: tweet.parentId ?? null,
    replyToUser,
    replies: sortedReplies.map((reply) =>
      mapFeedTweet(reply, loggedUserId, safeUser),
    ),
  };
}

export function mapFeed(
  tweets: FeedTweetResponse[] | null | undefined,
  loggedUserId?: string,
): FeedTweet[] {
  if (!Array.isArray(tweets)) return [];
  return tweets.map((tweet) => mapFeedTweet(tweet, loggedUserId));
}
