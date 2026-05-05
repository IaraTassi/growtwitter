import { describe, expect, it } from "vitest";
import type { FeedTweet } from "../../../../src/features/feed/types";
import { buildFollowingTimeline } from "../../../../src/features/feed/builders/buildFollowingTimeline";

describe("buildFollowingTimeline", () => {
  function createTweet(overrides?: Partial<FeedTweet>): FeedTweet {
    return {
      id: "1",
      content: "tweet",
      userId: "u2",
      parentId: null,
      createdAt: "2026-01-01T10:00:00Z",
      updatedAt: "2026-01-01T10:00:00Z",
      user: {
        id: "u2",
        name: "User",
        userName: "user",
        email: "",
        imageUrl: "",
        createdAt: "",
        updatedAt: "",
        ...(overrides?.user ?? {}),
      },
      likesCount: 0,
      repliesCount: 0,
      replies: [],
      isLiked: false,
      ...overrides,
    };
  }

  it("should return empty array when loggedUserId is not provided", () => {
    const feed = [
      createTweet({ id: "1", user: { ...createTweet().user, id: "u2" } }),
    ];

    const result = buildFollowingTimeline(feed);

    expect(result).toEqual([]);
  });

  it("should exclude tweets from logged user", () => {
    const feed = [
      createTweet({ id: "1", user: { ...createTweet().user, id: "u1" } }),
      createTweet({ id: "2", user: { ...createTweet().user, id: "u2" } }),
    ];

    const result = buildFollowingTimeline(feed, "u1");

    expect(result).toHaveLength(1);
    expect(result[0].root.id).toBe("2");
  });

  it("should exclude replies (parentId tweets)", () => {
    const feed = [
      createTweet({ id: "1", userId: "u2", parentId: null }),
      createTweet({ id: "2", userId: "u2", parentId: "tweet-parent" }),
    ];

    const result = buildFollowingTimeline(feed, "u1");

    expect(result).toHaveLength(1);
    expect(result[0].root.id).toBe("1");
  });

  it("should return correct structure with kind 'following'", () => {
    const feed = [createTweet({ id: "1", userId: "u2" })];

    const result = buildFollowingTimeline(feed, "u1");

    expect(result[0]).toEqual({
      kind: "following",
      root: feed[0],
    });
  });
});
