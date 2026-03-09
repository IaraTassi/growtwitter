import { describe, it, expect, vi, beforeEach } from "vitest";
import { toggleLike } from "../../../../src/features/feed/services/likeService";

describe("likeService - toggleLike", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  const token = "fake-token";
  const tweetId = "tweet-123";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should toggle like successfully", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "Like alternado com sucesso",
      }),
    } as Response);

    const result = await toggleLike(token, tweetId);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/api/likes/${tweetId}`,
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    expect(result).toEqual({
      message: "Like alternado com sucesso",
    });
  });

  it("should throw error when api fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Erro ao alternar like" }),
    } as Response);

    await expect(toggleLike(token, tweetId)).rejects.toThrow(
      "Erro ao alternar like",
    );
  });
});
