import { describe, it, expect, vi, beforeEach } from "vitest";
import type { FeedTweetResponse } from "../../../../src/features/feed/types";
import {
  createTweet,
  deleteTweet,
} from "../../../../src/features/feed/services/tweetService";

describe("tweetService", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  const token = "fake-token";
  const content = "Teste tweet";
  const tweetId = "123";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("tweetService - createTweet", () => {
    it("should return tweet when response is ok", async () => {
      const mockResponse: FeedTweetResponse = {
        id: "1",
        content,
        userId: "u1",
        createdAt: "",
        updatedAt: "",
        user: {
          id: "u1",
          name: "User Teste",
          userName: "teste",
          email: "",
          imageUrl: "",
          createdAt: "",
          updatedAt: "",
        },
        likesCount: 0,
        repliesCount: 0,
      };

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          message: "Tweet criado com sucesso.",
          tweet: mockResponse,
        }),
      } as Response);

      const result = await createTweet(token, content);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/tweets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
    });

    it("should throw error when response is not ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Unauthorized" }),
      } as Response);

      await expect(createTweet(token, content)).rejects.toThrow("Unauthorized");
    });

    it("should throw default error when response is not ok and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(createTweet(token, content)).rejects.toThrow(
        "Failed to fetch tweet",
      );
    });

    it("should throw error when tweet is missing", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({ tweet: null, message: "Invalid data" }),
      } as Response);

      await expect(createTweet(token, content)).rejects.toThrow("Invalid data");
    });

    it("should throw default error when tweet is invalid and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          message: undefined,
          tweet: undefined,
        }),
      } as Response);

      await expect(createTweet(token, content)).rejects.toThrow(
        "Não foi possível criar um tweet",
      );
    });
  });

  describe("tweetService - deleteTweet", () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("should delete tweet when response is ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          ok: true,
          message: "Tweet deletado com sucesso.",
        }),
      } as Response);

      await expect(deleteTweet(token, tweetId)).resolves.toBeUndefined();

      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/tweets/${tweetId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    });

    it("should throw error when response is not ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Unauthorized" }),
      } as Response);

      await expect(deleteTweet(token, tweetId)).rejects.toThrow("Unauthorized");
    });

    it("should throw default error when response is not ok and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(deleteTweet(token, tweetId)).rejects.toThrow(
        "Não foi possível deletar o tweet",
      );
    });

    it("should throw error when ok field is false", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ok: false, message: "Falha ao deletar" }),
      } as Response);

      await expect(deleteTweet(token, tweetId)).rejects.toThrow(
        "Falha ao deletar",
      );
    });

    it("should throw default error when ok field is false and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ok: false }),
      } as Response);

      await expect(deleteTweet(token, tweetId)).rejects.toThrow(
        "Não foi possível deletar o tweet",
      );
    });
  });
});
