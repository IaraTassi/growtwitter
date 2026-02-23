import { describe, expect, it, vi } from "vitest";
import { FeedTweet } from "../../../../src/features/feed/types";
import { getFeed } from "../../../../src/features/feed/services/feedService";

describe("feedService - getFeed", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  const token = "fake-token";

  it("should return tweets successfully", async () => {
    const mockResponse: FeedTweet[] = [
      {
        id: "1",
        content: "Tweet de teste",
        userId: "u1",
        createdAt: "2026-02-19T10:00:00Z",
        updatedAt: "2026-02-19T10:00:00Z",
        user: {
          id: "u1",
          name: "User Teste",
          userName: "teste",
          imageUrl: "",
          createdAt: "2026-02-19T10:00:00Z",
          updatedAt: "2026-02-19T10:00:00Z",
        },
      },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        ok: true,
        message: "Feed buscado com sucesso.",
        feed: mockResponse,
      }),
    } as Response);

    const result = await getFeed(token);

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/tweets/feed`,
      expect.objectContaining({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    );
  });

  it("should throw error when api returns error", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Unauthorized" }),
    } as Response);

    await expect(getFeed(token)).rejects.toThrow("Unauthorized");
  });
});
