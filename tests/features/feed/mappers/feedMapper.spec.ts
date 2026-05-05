import { describe, expect, it } from "vitest";
import type {
  FeedTweetResponse,
  FeedUser,
} from "../../../../src/features/feed/types";
import {
  mapFeed,
  mapFeedTweet,
} from "../../../../src/features/feed/mappers/feedMapper";

function createMockUser(overrides?: Partial<FeedUser>): FeedUser {
  return {
    id: "u1",
    name: "User Teste",
    userName: "teste",
    imageUrl: "",
    email: "",
    createdAt: "2026-02-19T10:00:00Z",
    updatedAt: "2026-02-19T10:00:00Z",
    ...overrides,
  };
}

function createMockTweetResponse(
  overrides?: Partial<FeedTweetResponse>,
): FeedTweetResponse {
  return {
    id: "1",
    content: "Tweet de teste",
    userId: "u1",
    createdAt: "2026-02-19T10:00:00Z",
    updatedAt: "2026-02-19T10:00:00Z",
    user: createMockUser(),
    likes: [],
    replies: [],
    parentId: null,
    likesCount: 0,
    repliesCount: 0,
    ...overrides,
  };
}

describe("feedMapper", () => {
  describe("feedMapper - mapFeedTweet", () => {
    const loggedUserId = "u1";

    it("should map a simple tweet correctly with like", () => {
      const tweetResponse = createMockTweetResponse({
        likes: [
          {
            userId: loggedUserId,
            tweetId: "1",
            createdAt: "2026-03-04T16:34:25.840Z",
            updatedAt: "2026-03-04T16:34:25.840Z",
          },
        ],
        likesCount: 1,
        repliesCount: 0,
      });

      const result = mapFeedTweet(tweetResponse, loggedUserId);

      expect(result.id).toBe("1");
      expect(result.content).toBe("Tweet de teste");
      expect(result.userId).toBe("u1");
      expect(result.parentId).toBeNull();
      expect(result.likesCount).toBe(1);
      expect(result.isLiked).toBe(true);
      expect(result.repliesCount).toBe(0);
      expect(result.replies).toEqual([]);
    });

    it("should map nested replies recursively", () => {
      const reply2 = createMockTweetResponse({
        id: "3",
        parentId: "2",
      });

      const reply1 = createMockTweetResponse({
        id: "2",
        parentId: "1",
        replies: [reply2],
      });

      const tweetResponse = createMockTweetResponse({
        id: "1",
        replies: [reply1],
      });

      const result = mapFeedTweet(tweetResponse, "u2");

      expect(result.replies).toHaveLength(1);
      expect(result.replies[0].id).toBe("2");
      expect(result.replies[0].parentId).toBe("1");

      expect(result.replies[0].replies).toHaveLength(1);
      expect(result.replies[0].replies[0].id).toBe("3");
      expect(result.replies[0].replies[0].parentId).toBe("2");
    });

    it("should preserve parentId for replies", () => {
      const tweet = createMockTweetResponse({
        parentId: "10",
      });

      const result = mapFeedTweet(tweet);

      expect(result.parentId).toBe("10");
    });

    it("should set isLiked to false when no loggedUserId", () => {
      const tweet = createMockTweetResponse({
        likes: [
          {
            userId: "u1",
            tweetId: "1",
            createdAt: "",
            updatedAt: "",
          },
        ],
        likesCount: 1,
      });

      const result = mapFeedTweet(tweet);

      expect(result.isLiked).toBe(false);
    });

    it("should handle empty likes and replies safely", () => {
      const tweet = createMockTweetResponse({
        likes: [],
        replies: [],
        likesCount: 0,
        repliesCount: 0,
      });

      const result = mapFeedTweet(tweet);

      expect(result.likesCount).toBe(0);
      expect(result.repliesCount).toBe(0);
      expect(result.replies).toEqual([]);
    });

    it("should correctly calculate likesCount with multiple likes", () => {
      const tweet = createMockTweetResponse({
        likes: [
          { userId: "u1", tweetId: "1", createdAt: "", updatedAt: "" },
          { userId: "u2", tweetId: "1", createdAt: "", updatedAt: "" },
        ],
        likesCount: 2,
        repliesCount: 0,
      });

      const result = mapFeedTweet(tweet, "u1");

      expect(result.likesCount).toBe(2);
      expect(result.isLiked).toBe(true);
    });

    it("should set isLiked to false when user did not like", () => {
      const tweet = createMockTweetResponse({
        likes: [{ userId: "u2", tweetId: "1", createdAt: "", updatedAt: "" }],
      });

      const result = mapFeedTweet(tweet, "u1");

      expect(result.isLiked).toBe(false);
    });
  });

  describe("feedMapper - mapFeed", () => {
    it("should map an array of tweets correctly", () => {
      const tweet1 = createMockTweetResponse({ id: "1" });
      const tweet2 = createMockTweetResponse({ id: "2" });
      const feed = [tweet1, tweet2];

      const result = mapFeed(feed, "u1");

      expect(result.length).toBe(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("2");
    });

    it("should return empty array if input is null or undefined", () => {
      expect(mapFeed(null)).toEqual([]);
      expect(mapFeed(undefined)).toEqual([]);
    });

    it("should pass loggedUserId correctly to all tweets", () => {
      const tweet = createMockTweetResponse({
        likes: [{ userId: "u1", tweetId: "1", createdAt: "", updatedAt: "" }],
      });

      const result = mapFeed([tweet], "u1");

      expect(result[0].isLiked).toBe(true);
    });
  });
});
