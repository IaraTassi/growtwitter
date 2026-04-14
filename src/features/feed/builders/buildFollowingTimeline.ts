import type { FeedTweet } from "../types";

export function buildFollowingTimeline(
  feed: FeedTweet[],
  loggedUserId?: string,
) {
  if (!loggedUserId) return [];

  const sorted = [...feed].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return sorted
    .filter((tweet) => tweet.user.id !== loggedUserId && !tweet.parentId)
    .map((tweet) => ({
      kind: "following" as const,
      root: tweet,
    }));
}
