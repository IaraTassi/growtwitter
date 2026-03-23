import { describe, it, expect } from "vitest";
import {
  selectFeedTweets,
  selectFeedLoading,
  selectFeedError,
  selectLikedTweets,
  selectReplies,
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

  describe("feedSelectors - selectLikedTweets", () => {
    it("should return only tweets with isLiked true", () => {
      const state = {
        ...mockState,
        feed: {
          ...mockState.feed,
          tweets: [
            createMockTweet({ id: "1", isLiked: false }),
            createMockTweet({ id: "2", isLiked: true }),
          ],
        },
      };

      const liked = selectLikedTweets(state);

      expect(liked).toHaveLength(1);
      expect(liked[0].id).toBe("2");
    });

    it("should return empty array when no tweets are liked", () => {
      const state = {
        ...mockState,
        feed: {
          ...mockState.feed,
          tweets: [createMockTweet({ id: "1", isLiked: false })],
        },
      };

      const liked = selectLikedTweets(state);

      expect(liked).toHaveLength(0);
    });

    it("should return multiple liked tweets", () => {
      const state = {
        ...mockState,
        feed: {
          ...mockState.feed,
          tweets: [
            createMockTweet({ id: "1", isLiked: true }),
            createMockTweet({ id: "2", isLiked: true }),
            createMockTweet({ id: "3", isLiked: false }),
          ],
        },
      };

      const liked = selectLikedTweets(state);

      expect(liked).toHaveLength(2);
      expect(liked.map((t) => t.id)).toEqual(["1", "2"]);
    });

    it("should not sort tweets (keeps original order)", () => {
      const state = {
        ...mockState,
        feed: {
          ...mockState.feed,
          tweets: [
            createMockTweet({ id: "1", isLiked: true }),
            createMockTweet({ id: "2", isLiked: true }),
          ],
        },
      };

      const liked = selectLikedTweets(state);

      expect(liked[0].id).toBe("1");
      expect(liked[1].id).toBe("2");
    });
  });

  describe("feedSelectors - selectFeedReplies", () => {
    it("should return all replies for a given tweet", () => {
      const tweetWithReplies = createMockTweet({
        id: "3",
        replies: [
          createMockTweet({ id: "3-1", parentId: "3" }),
          createMockTweet({ id: "3-2", parentId: "3" }),
        ],
      });

      const state: RootState = {
        ...mockState,
        feed: {
          ...mockState.feed,
          tweets: [createMockTweet({ id: "1" }), tweetWithReplies],
        },
      };

      const replies = selectReplies(state);
      const repliesForTweet3 = replies.filter((r) => r.parentId === "3");

      expect(repliesForTweet3).toHaveLength(2);
      expect(repliesForTweet3.map((r) => r.id)).toEqual(["3-1", "3-2"]);
    });

    it("should return empty array when there are no replies", () => {
      const state: RootState = {
        ...mockState,
        feed: {
          ...mockState.feed,
          tweets: [createMockTweet({ id: "1" })],
        },
      };

      const replies = selectReplies(state);

      expect(replies).toHaveLength(0);
    });
  });
});
