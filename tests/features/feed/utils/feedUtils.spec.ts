import {
  insertReplyRecursive,
  updateLikeRecursive,
} from "../../../../src/features/feed/utils/feedUtils";
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
      email: "",
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

describe("feedUtils", () => {
  describe("feedUtils - updateLikeRecursive", () => {
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

  describe("feedUtils - insertReplyRecursive", () => {
    it("should insert reply into root tweet", () => {
      const tweet = createMockTweet({ id: "1" });
      const reply = createMockTweet({
        id: "r1",
        content: "Nova reply",
        parentId: "1",
      });

      const updated = insertReplyRecursive(tweet, reply);

      expect(updated.replies.length).toBe(1);
      expect(updated.replies[0].id).toBe("r1");
      expect(updated.replies[0].content).toBe("Nova reply");
    });

    it("should insert reply into nested reply", () => {
      const nestedReply = createMockTweet({ id: "2" });
      const tweet = createMockTweet({ id: "1", replies: [nestedReply] });
      const reply = createMockTweet({
        id: "r2",
        content: "Reply na nested",
        parentId: "2",
      });

      const updated = insertReplyRecursive(tweet, reply);

      expect(updated.replies[0].replies.length).toBe(1);
      expect(updated.replies[0].replies[0].id).toBe("r2");
      expect(updated.replies[0].replies[0].content).toBe("Reply na nested");
    });

    it("should not modify tweet if parentId does not exist", () => {
      const tweet = createMockTweet({ id: "1" });
      const reply = createMockTweet({ id: "r3", parentId: "999" });

      const updated = insertReplyRecursive(tweet, reply);

      expect(updated.replies.length).toBe(0);
    });
  });
});
