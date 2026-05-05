import { describe, expect, it } from "vitest";
import type { FeedTweet } from "../../../../src/features/feed/types";
import { buildForYouTimeline } from "../../../../src/features/feed/builders/buildForYouTimeline";

describe("buildForYouTimeline", () => {
  function createTweet(overrides?: Partial<FeedTweet>): FeedTweet {
    return {
      id: "1",
      content: "tweet",
      userId: "u1",
      parentId: null,
      createdAt: "2026-01-01T10:00:00Z",
      updatedAt: "2026-01-01T10:00:00Z",
      user: {
        id: "u1",
        name: "User",
        userName: "user",
        email: "",
        imageUrl: "",
        createdAt: "",
        updatedAt: "",
      },
      likesCount: 0,
      isLiked: false,
      repliesCount: 0,
      replies: [],
      ...overrides,
    };
  }

  it("should return foryou-simple when tweet has no replies", () => {
    const feed = [
      createTweet({
        id: "1",
        createdAt: "2026-01-01T10:00:00Z",
        replies: [],
      }),
    ];

    const result = buildForYouTimeline(feed);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      kind: "foryou-simple",
      root: feed[0],
    });
  });

  it("should return foryou-simple when tweet has no replies", () => {
    const feed = [
      createTweet({
        id: "1",
        createdAt: "2026-01-01T10:00:00Z",
        replies: [],
      }),
    ];

    const result = buildForYouTimeline(feed);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      kind: "foryou-simple",
      root: feed[0],
    });
  });

  it("should sort feed by createdAt descending", () => {
    const older = createTweet({
      id: "1",
      createdAt: "2026-01-01T10:00:00Z",
    });

    const newer = createTweet({
      id: "2",
      createdAt: "2026-01-02T10:00:00Z",
    });

    const result = buildForYouTimeline([older, newer]);

    expect(result[0].root.id).toBe("2");
    expect(result[1].root.id).toBe("1");
  });

  it("should sort feed by createdAt descending", () => {
    const older = createTweet({
      id: "1",
      createdAt: "2026-01-01T10:00:00Z",
    });

    const newer = createTweet({
      id: "2",
      createdAt: "2026-01-02T10:00:00Z",
    });

    const result = buildForYouTimeline([older, newer]);

    expect(result[0].root.id).toBe("2");
    expect(result[1].root.id).toBe("1");
  });
});
