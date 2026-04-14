import type { FeedTweet, TimelineItem } from "../types";

export function buildForYouTimeline(feed: FeedTweet[]): TimelineItem[] {
  const sorted = [...feed].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return sorted.map((root) => {
    const replies = root.replies ?? [];

    if (replies.length === 0) {
      return { kind: "foryou-simple", root };
    }

    if (replies.length === 1 && (replies[0].replies?.length ?? 0) === 0) {
      return {
        kind: "foryou-single-reply",
        root,
        reply: replies[0],
      };
    }

    return {
      kind: "foryou-thread",
      root,
    };
  });
}
