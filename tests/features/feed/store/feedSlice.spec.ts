import { describe, expect, it } from "vitest";
import {
  fetchFeed,
  toggleLikeThunk,
} from "../../../../src/features/feed/store/feedThunks";
import reducer from "../../../../src/features/feed/store/feedSlice";
import type { FeedState, FeedTweet } from "../../../../src/features/feed/types";

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

const initialState: FeedState = {
  tweets: [],
  loading: false,
  error: null,
};

describe("feedSlice", () => {
  describe("feedSlice - fetchFeed", () => {
    it("should handle fetchFeed.pending", () => {
      const action = { type: fetchFeed.pending.type };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should handle fetchFeed.fulfilled", () => {
      const tweets = [createMockTweet()];
      const action = {
        type: fetchFeed.fulfilled.type,
        payload: tweets,
      };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.tweets).toEqual(tweets);
    });

    it("should handle fetchFeed.rejected", () => {
      const action = {
        type: fetchFeed.rejected.type,
        payload: "Erro ao buscar",
      };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe("Erro ao buscar");
    });
  });

  describe("feedSlice - toggleLikeThunk", () => {
    it("should apply optimistic update on pending", () => {
      const stateWithTweet: FeedState = {
        tweets: [createMockTweet()],
        loading: false,
        error: null,
      };

      const action = {
        type: toggleLikeThunk.pending.type,
        meta: { arg: "1" },
      };

      const newState = reducer(stateWithTweet, action);

      expect(newState.tweets[0].likesCount).toBe(1);
      expect(newState.tweets[0].isLiked).toBe(true);
    });

    it("should handle toggleLikeThunk.fulfilled", () => {
      const stateWithTweet: FeedState = {
        tweets: [createMockTweet({ likesCount: 1, isLiked: true })],
        loading: false,
        error: null,
      };

      const action = {
        type: toggleLikeThunk.fulfilled.type,
        payload: "1",
      };

      const state = reducer(stateWithTweet, action);

      expect(state.tweets[0].likesCount).toBe(1);
      expect(state.tweets[0].isLiked).toBe(true);
    });

    it("should rollback on rejected", () => {
      const stateAfterPending: FeedState = {
        tweets: [createMockTweet({ likesCount: 1, isLiked: true })],
        loading: false,
        error: null,
      };

      const action = {
        type: toggleLikeThunk.rejected.type,
        meta: { arg: "1" },
        payload: "Erro",
      };

      const newState = reducer(stateAfterPending, action);

      expect(newState.tweets[0].likesCount).toBe(0);
      expect(newState.tweets[0].isLiked).toBe(false);
      expect(newState.error).toBe("Erro");
    });

    it("should toggle like recursively in replies", () => {
      const reply = createMockTweet({ id: "2" });
      const tweet = createMockTweet({ replies: [reply] });
      const stateWithTweet: FeedState = {
        tweets: [tweet],
        loading: false,
        error: null,
      };

      const action = {
        type: toggleLikeThunk.pending.type,
        meta: { arg: "2" },
      };

      const newState = reducer(stateWithTweet, action);

      expect(newState.tweets[0].replies[0].likesCount).toBe(1);
      expect(newState.tweets[0].replies[0].isLiked).toBe(true);
    });
  });
});
