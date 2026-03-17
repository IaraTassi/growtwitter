import { describe, expect, it } from "vitest";
import {
  createReplyThunk,
  createTweetThunk,
  fetchFeed,
  toggleLikeThunk,
} from "../../../../src/features/feed/store/feedThunks";
import reducer, {
  removeTweet,
} from "../../../../src/features/feed/store/feedSlice";
import type { FeedState, FeedTweet } from "../../../../src/features/feed/types";
import { insertReplyRecursive } from "../../../../src/features/feed/utils/feedUtils";

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

  describe("feedSlice - createReplyThunk", () => {
    const parentTweet = createMockTweet({ id: "1", content: "Tweet pai" });

    it("should handle pending state", () => {
      const action = { type: createReplyThunk.pending.type };
      const state = reducer(
        { tweets: [parentTweet], loading: false, error: null },
        action,
      );
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should handle fulfilled state and insert reply", () => {
      const reply = createMockTweet({
        id: "2",
        replyToId: "1",
        content: "Essa é uma reply",
        userId: "user2",
      });

      const action = {
        type: createReplyThunk.fulfilled.type,
        payload: reply,
      };

      const state = reducer(
        { tweets: [parentTweet], loading: false, error: null },
        action,
      );

      expect(state.loading).toBe(false);
      expect(state.tweets[0].replies).toHaveLength(1);
      expect(state.tweets[0].replies[0]).toEqual(reply);
      expect(state.tweets[0].repliesCount).toBe(1);
    });

    it("should handle rejected state", () => {
      const action = {
        type: createReplyThunk.rejected.type,
        payload: "Erro ao criar reply",
      };
      const state = reducer(
        { tweets: [parentTweet], loading: false, error: null },
        action,
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe("Erro ao criar reply");
    });

    it("insertReplyRecursive should insert reply deeply", () => {
      const nestedTweet = createMockTweet({
        id: "3",
        replies: [createMockTweet({ id: "4", replyToId: "3" })],
        repliesCount: 1,
      });

      const reply = createMockTweet({
        id: "5",
        replyToId: "4",
        content: "nested reply",
      });

      const updated = insertReplyRecursive(nestedTweet, reply);

      expect(updated.replies[0].replies).toHaveLength(1);
      expect(updated.replies[0].replies[0]).toEqual(reply);
      expect(updated.replies[0].repliesCount).toBe(1);
      expect(updated.repliesCount).toBe(1);
    });
  });

  describe("feedSlice - createTweetThunk", () => {
    it("should handle pending state", () => {
      const action = { type: createTweetThunk.pending.type };

      const state = reducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should handle fulfilled state and insert tweet at beginning", () => {
      const existingTweet = createMockTweet({ id: "1" });

      const newTweet = createMockTweet({
        id: "2",
        content: "Novo tweet",
      });

      const action = {
        type: createTweetThunk.fulfilled.type,
        payload: newTweet,
      };

      const state = reducer(
        {
          tweets: [existingTweet],
          loading: false,
          error: null,
        },
        action,
      );

      expect(state.loading).toBe(false);
      expect(state.tweets).toHaveLength(2);

      expect(state.tweets[0].id).toBe("2");
      expect(state.tweets[0].replies).toEqual([]);

      expect(state.tweets[1].id).toBe("1");
    });

    it("should handle rejected state", () => {
      const action = {
        type: createTweetThunk.rejected.type,
        payload: "Erro ao criar tweet",
      };

      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe("Erro ao criar tweet");
    });
  });

  describe("feedSlice - removeTweet", () => {
    it("should remove a root tweet", () => {
      const tweet = createMockTweet({ id: "1" });
      const state: FeedState = { ...initialState, tweets: [tweet] };

      const nextState = reducer(state, removeTweet("1"));

      expect(nextState.tweets.length).toBe(0);
    });

    it("should remove a nested reply tweet", () => {
      const reply = createMockTweet({ id: "2" });
      const tweet = createMockTweet({ id: "1", replies: [reply] });
      const state: FeedState = { ...initialState, tweets: [tweet] };

      const nextState = reducer(state, removeTweet("2"));

      expect(nextState.tweets.length).toBe(1);
      expect(nextState.tweets[0].replies.length).toBe(0);
    });

    it("should do nothing if tweet id does not exist", () => {
      const tweet = createMockTweet({ id: "1" });
      const state: FeedState = { ...initialState, tweets: [tweet] };

      const nextState = reducer(state, removeTweet("999"));

      expect(nextState).toEqual(state);
    });

    it("should remove multiple nested replies recursively", () => {
      const reply2 = createMockTweet({ id: "3" });
      const reply1 = createMockTweet({ id: "2", replies: [reply2] });
      const tweet = createMockTweet({ id: "1", replies: [reply1] });
      const state: FeedState = { ...initialState, tweets: [tweet] };

      const nextState = reducer(state, removeTweet("3"));

      expect(nextState.tweets[0].replies[0].replies.length).toBe(0);
    });
  });
});
