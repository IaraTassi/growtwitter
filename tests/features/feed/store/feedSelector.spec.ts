import { describe, it, expect } from "vitest";
import {
  selectFeedTweets,
  selectFeedLoading,
  selectFeedError,
} from "../../../../src/features/feed/store/feedSelectors";
import type { FeedTweet } from "../../../../src/features/feed/types";
import { RootState } from "../../../../src/store/store";

describe("feedSelectors", () => {
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

  const mockState: RootState = {
    auth: {
      token: "token123",
      user: {
        id: "user1",
        name: "User 1",
        userName: "user1",
        email: "",
        imageUrl: "",
      },
      loading: false,
      error: null,
    },
    feed: {
      tweets: [],
      loading: false,
      error: null,
    },
  };

  describe("feedSelectors - selectFeedTweets", () => {
    it("should return all tweets", () => {
      const state = {
        ...mockState,
        feed: {
          ...mockState.feed,
          tweets: [createMockTweet({ id: "1" }), createMockTweet({ id: "2" })],
        },
      };

      const tweets = selectFeedTweets(state);

      expect(tweets).toHaveLength(2);
      expect(tweets[0].id).toBe("1");
    });
  });

  describe("feedSelectors - selectFeedLoading", () => {
    it("should return loading state", () => {
      const state = {
        ...mockState,
        feed: { ...mockState.feed, loading: true },
      };

      expect(selectFeedLoading(state)).toBe(true);
    });
  });

  describe("feedSelectors - selectFeedError", () => {
    it("should return error message", () => {
      const state = {
        ...mockState,
        feed: { ...mockState.feed, error: "Erro" },
      };

      expect(selectFeedError(state)).toBe("Erro");
    });
  });
});
