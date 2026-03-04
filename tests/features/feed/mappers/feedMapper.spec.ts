import { describe, expect, it } from "vitest";
import {
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
    parent: null,
    ...overrides,
  };
}

describe("feedMapper", () => {
  describe("mapFeedTweet", () => {
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
      });

      const result = mapFeedTweet(tweetResponse, loggedUserId);

      expect(result).toEqual({
        id: "1",
        content: "Tweet de teste",
        userId: "u1",
        createdAt: "2026-02-19T10:00:00Z",
        updatedAt: "2026-02-19T10:00:00Z",
        user: createMockUser(),
        likesCount: 1,
        isLiked: true,
        repliesCount: 0,
        replyToId: null,
        replyToUser: null,
        replies: [],
      });
    });

    it("should handle tweet with replies and nested replies", () => {
      const reply1 = createMockTweetResponse({ id: "2", parentId: "1" });
      const reply2 = createMockTweetResponse({ id: "3", parentId: "2" });

      const tweetResponse = createMockTweetResponse({
        replies: [reply1],
      });

      reply1.replies = [reply2];

      const result = mapFeedTweet(tweetResponse, "u2");

      expect(result.replies.length).toBe(1);
      expect(result.replies[0].id).toBe("2");
      expect(result.replies[0].replies[0].id).toBe("3");
    });

    it("should use parentUser if parent.user is not available", () => {
      const parentUser = createMockUser({ id: "parent" });
      const reply = createMockTweetResponse({
        id: "2",
        parent: null,
        parentId: "1",
      });

      const result = mapFeedTweet(reply, "u2", parentUser);

      expect(result.replyToUser).toEqual(parentUser);
    });
  });

  describe("mapFeed", () => {
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
  });
});
