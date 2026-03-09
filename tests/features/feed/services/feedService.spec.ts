import { describe, expect, it, vi } from "vitest";
import { FeedTweetResponse } from "../../../../src/features/feed/types";
import { getFeed } from "../../../../src/features/feed/services/feedService";

describe("feedService - getFeed", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  const token = "fake-token";

  it("should return tweets successfully", async () => {
    const mockResponse: FeedTweetResponse[] = [
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
          email: "",
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

  it("should throw session expired on 401", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      status: 401,
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(getFeed(token)).rejects.toThrow("Sessão expirada");
  });

  it("should throw error when feed is not an array", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        feed: null,
        message: "Invalid feed format",
      }),
    } as Response);

    await expect(getFeed(token)).rejects.toThrow("Invalid feed format");
  });

  it("should throw default error when feed is invalid and no message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        feed: null,
      }),
    } as Response);

    await expect(getFeed(token)).rejects.toThrow(
      "Resposta não é lista de tweets",
    );
  });

  it("should throw default error when response is not ok and no message", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(getFeed(token)).rejects.toThrow("Failed to fetch feed");
  });
});
