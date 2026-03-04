import { describe, it, expect, vi, beforeEach } from "vitest";
import { FeedTweetResponse } from "../../../../src/features/feed/types";
import { createReply } from "../../../../src/features/feed/services/replyService";

describe("tweetService - createReply", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  const token = "fake-token";
  const parentId = "123";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should call fetch with correct URL and headers", async () => {
    const mockResponse: FeedTweetResponse[] = [
      {
        id: "1",
        content: "reply",
        userId: "",
        createdAt: "",
        updatedAt: "",
        user: {
          id: "u1",
          name: "User Teste",
          userName: "teste",
          imageUrl: "",
          createdAt: "2026-02-19T10:00:00Z",
          updatedAt: "2026-02-19T10:00:00Z",
        },
        likes: [],
        replies: [],
      },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        feed: mockResponse,
      }),
    } as Response);

    const result = await createReply(token, parentId);

    expect(result).toEqual(mockResponse);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/tweets/${parentId}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      },
    );
  });

  it("should return feed when response is ok", async () => {
    const mockFeed = [{ id: "1", content: "reply" }];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        feed: mockFeed,
      }),
    } as Response);

    const result = await createReply(token, parentId);

    expect(result).toEqual(mockFeed);
  });

  it("should throw error when response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: "Unauthorized",
      }),
    } as Response);

    await expect(createReply(token, parentId)).rejects.toThrow("Unauthorized");
  });

  it("should throw default error when response is not ok and no message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(createReply(token, parentId)).rejects.toThrow(
      "Failed to fetch reply",
    );
  });

  it("should throw error when feed is not an array", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        feed: null,
        message: "Invalid data",
      }),
    } as Response);

    await expect(createReply(token, parentId)).rejects.toThrow("Invalid data");
  });

  it("should throw default error when feed is invalid and no message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        feed: null,
      }),
    } as Response);

    await expect(createReply(token, parentId)).rejects.toThrow(
      "Não foi possível criar uma resposta",
    );
  });
});
