import { useDeleteTweet } from "../../../../src/features/feed/hooks/useTweets";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as tweetService from "../../../../src/features/feed/services/tweetService";

vi.mock("../../../../src/features/feed/services/tweetService");

describe("useDeleteTweet", () => {
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
