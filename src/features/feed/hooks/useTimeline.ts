import { useMemo } from "react";
import type { FeedTweet, TabType, TimelineItem } from "../types";

export function useTimeline(
  feed: FeedTweet[],
  tab: TabType,
  loggedUserId?: string,
): TimelineItem[] {
  return useMemo(() => {
    if (tab === "following") {
      if (!loggedUserId) return [];

      return [...feed]
        .filter((tweet) => tweet.user.id !== loggedUserId)
        .sort((a, b) => b.likesCount - a.likesCount)
        .map<TimelineItem>((tweet) => ({ kind: "following", root: tweet }));
    }

    return [...feed]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .map<TimelineItem>((root) => {
        const directReplies = root.replies || [];

        if (directReplies.length === 0) {
          return { kind: "foryou-simple", root, replies: [] };
        }

        if (
          directReplies.length === 1 &&
          (!directReplies[0].replies || directReplies[0].replies.length === 0)
        ) {
          return { kind: "foryou-single-reply", root, reply: directReplies[0] };
        }

        return {
          kind: "foryou-thread",
          root,
          replies: directReplies,
          hasNestedReplies: directReplies.some(
            (r) => r.replies && r.replies.length > 0,
          ),
        };
      });
  }, [feed, tab, loggedUserId]);
}
