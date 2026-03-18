import {
  useDeleteTweet,
  useRepliesThreads,
} from "../../../../src/features/feed/hooks/useTweets";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as tweetService from "../../../../src/features/feed/services/tweetService";
import { FeedTweet } from "../../../../src/features/feed/types";
import * as tweetUtils from "../../../../src/features/feed/utils/tweetUtils";

vi.mock("@/features/feed/services/tweetService");

describe("useTweets", () => {
  function createMockTweet(overrides?: Partial<FeedTweet>): FeedTweet {
    const baseUserId = overrides?.userId ?? overrides?.user?.id ?? "user1";

    const base: FeedTweet = {
      id: "1",
      content: "Tweet",
      userId: baseUserId,
      createdAt: "",
      updatedAt: "",
      user: {
        id: baseUserId,
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
    };

    return {
      ...base,
      ...overrides,
      userId: baseUserId,
      user: {
        ...base.user,
        ...overrides?.user,
        id: baseUserId,
      },
    };
  }

  describe("useTweets - useDeleteTweet", () => {
    const token = "mock-token";

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should call deleteTweet with correct arguments", async () => {
      const deleteTweetMock = vi
        .spyOn(tweetService, "deleteTweet")
        .mockResolvedValueOnce(undefined);

      const { result } = renderHook(() => useDeleteTweet(token));

      await result.current.handleDelete("tweet-1");

      expect(deleteTweetMock).toHaveBeenCalledWith(token, "tweet-1");
    });

    it("should call onSuccess callback after successful deletion", async () => {
      vi.spyOn(tweetService, "deleteTweet").mockResolvedValueOnce(undefined);

      const onSuccess = vi.fn();
      const { result } = renderHook(() => useDeleteTweet(token));

      await result.current.handleDelete("tweet-2", onSuccess);

      expect(onSuccess).toHaveBeenCalled();
    });

    it("should not call onSuccess if deleteTweet throws an error", async () => {
      vi.spyOn(tweetService, "deleteTweet").mockRejectedValueOnce(
        new Error("Failed"),
      );

      const onSuccess = vi.fn();
      const { result } = renderHook(() => useDeleteTweet(token));

      await result.current.handleDelete("tweet-3", onSuccess);

      expect(onSuccess).not.toHaveBeenCalled();
    });

    it("should log error if deleteTweet fails", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      vi.spyOn(tweetService, "deleteTweet").mockRejectedValueOnce(
        new Error("Failed"),
      );

      const { result } = renderHook(() => useDeleteTweet(token));

      await result.current.handleDelete("tweet-4");

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Erro ao deletar tweet",
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("useTweets - useRepliesThreads", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should call mapThreads with correct arguments", () => {
      const mapThreadsMock = vi
        .spyOn(tweetUtils, "mapThreads")
        .mockReturnValue(new Map());

      const feed = [createMockTweet()];
      const userId = "user1";

      renderHook(() => useRepliesThreads(feed, userId));

      expect(mapThreadsMock).toHaveBeenCalledWith(feed, userId);
    });

    it("should return the result from mapThreads", () => {
      const mockMap = new Map([
        ["1", { root: createMockTweet(), replies: [] }],
      ]);

      vi.spyOn(tweetUtils, "mapThreads").mockReturnValue(mockMap);

      const { result } = renderHook(() =>
        useRepliesThreads([createMockTweet()], "user1"),
      );

      expect(result.current).toBe(mockMap);
    });

    it("should recompute when feed changes", () => {
      const mapThreadsMock = vi
        .spyOn(tweetUtils, "mapThreads")
        .mockReturnValue(new Map());

      const { rerender } = renderHook(
        ({ feed, userId }) => useRepliesThreads(feed, userId),
        {
          initialProps: {
            feed: [createMockTweet({ id: "1" })],
            userId: "user1",
          },
        },
      );

      rerender({
        feed: [createMockTweet({ id: "2" })],
        userId: "user1",
      });

      expect(mapThreadsMock).toHaveBeenCalledTimes(2);
    });

    it("should recompute when userId changes", () => {
      const mapThreadsMock = vi
        .spyOn(tweetUtils, "mapThreads")
        .mockReturnValue(new Map());

      const { rerender } = renderHook(
        ({ feed, userId }) => useRepliesThreads(feed, userId),
        {
          initialProps: {
            feed: [createMockTweet()],
            userId: "user1",
          },
        },
      );

      rerender({
        feed: [createMockTweet()],
        userId: "user2",
      });

      expect(mapThreadsMock).toHaveBeenCalledTimes(2);
    });

    it("should NOT recompute when dependencies do not change", () => {
      const mapThreadsMock = vi
        .spyOn(tweetUtils, "mapThreads")
        .mockReturnValue(new Map());

      const feed = [createMockTweet()];

      const { rerender } = renderHook(
        ({ feed, userId }) => useRepliesThreads(feed, userId),
        {
          initialProps: {
            feed,
            userId: "user1",
          },
        },
      );

      rerender({
        feed,
        userId: "user1",
      });

      expect(mapThreadsMock).toHaveBeenCalledTimes(1);
    });
  });
});
