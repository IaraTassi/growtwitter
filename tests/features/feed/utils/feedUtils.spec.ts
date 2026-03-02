import { updateLikeRecursive } from "../../../../src/features/feed/utils/feedUtils";
import { describe, expect, it } from "vitest";
import type { FeedTweet } from "../../../../src/features/feed/types";

function createMockTweet(overrides?: Partial<FeedTweet>): FeedTweet {
  return {
    id: "1",
    content: "Tweet",
    userId: "user1",
    createdAt: "",
    updatedAt: "",
    user: {
      id: "user1",
      name: "User 1",
      userName: "user1",
      createdAt: "",
      updatedAt: "",
    },
    likesCount: 0,
    isLiked: false,
    repliesCount: 0,
    replyToId: null,
    replyToUser: null,
    replies: [],
    ...overrides,
  };
}

describe("updateLikeRecursive", () => {
  it("should toggle like on root tweet", () => {
    const tweet = createMockTweet();

    const updated = updateLikeRecursive(tweet, "1");

    expect(updated.isLiked).toBe(true);
    expect(updated.likesCount).toBe(1);
  });

  it("should unlike if already liked", () => {
    const tweet = createMockTweet({
      isLiked: true,
      likesCount: 3,
    });

    const updated = updateLikeRecursive(tweet, "1");

    expect(updated.isLiked).toBe(false);
    expect(updated.likesCount).toBe(2);
  });

  it("should update nested reply", () => {
    const reply = createMockTweet({
      id: "2",
      likesCount: 1,
      isLiked: false,
    });

    const tweet = createMockTweet({
      replies: [reply],
    });

    const updated = updateLikeRecursive(tweet, "2");

    expect(updated.replies[0].isLiked).toBe(true);
    expect(updated.replies[0].likesCount).toBe(2);
  });

  it("should not modify tweet if id does not match", () => {
    const tweet = createMockTweet();

    const updated = updateLikeRecursive(tweet, "999");

    expect(updated).toEqual(tweet);
  });
});
