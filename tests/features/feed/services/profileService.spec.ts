import { beforeEach, describe, expect, it, vi } from "vitest";
import type {
  ProfileTweetResponseDto,
  ProfileReplyResponseDto,
  ProfileLikedTweetResponseDto,
} from "../../../../src/features/feed/types";
import {
  getProfileTweets,
  getProfileReplies,
  getProfileLikes,
} from "../../../../src/features/feed/services/profileService";

describe("profileService", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  const token = "fake-token";
  const userId = "user-1";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const makeTweet = (): ProfileTweetResponseDto => ({
    id: "tweet-1",
    content: "Hello world",
    createdAt: "2026-01-01T00:00:00.000Z",

    user: {
      id: "user-1",
      name: "User 1",
      userName: "user1",
      imageUrl: "",
    },

    likesCount: 10,
    repliesCount: 5,
  });

  const makeReply = (): ProfileReplyResponseDto => ({
    id: "tweet-1",
    content: "Hello world",
    createdAt: "2026-01-01T00:00:00.000Z",

    user: {
      id: "user-1",
      name: "User 1",
      userName: "user1",
      imageUrl: "",
    },
    replies: [],
  });

  const makeLike = (): ProfileLikedTweetResponseDto => ({
    id: "tweet-1",
    content: "Hello world",
    createdAt: "2026-01-01T00:00:00.000Z",

    user: {
      id: "user-1",
      name: "User 1",
      userName: "user1",
      imageUrl: "",
    },

    likesCount: 10,
  });

  describe("profileService - getProfileTweets", () => {
    it("should return tweets when response is ok", async () => {
      const mockTweets = [makeTweet()];

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          tweets: mockTweets,
        }),
      } as Response);

      const result = await getProfileTweets(userId, token);

      expect(result).toEqual(mockTweets);

      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/profile/${userId}/tweets`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
    });

    it("should throw error when response is not ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Unauthorized" }),
      } as Response);

      await expect(getProfileTweets(userId, token)).rejects.toThrow(
        "Unauthorized",
      );
    });

    it("should throw default error when response is not ok and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(getProfileTweets(userId, token)).rejects.toThrow(
        "Failed to fetch profile tweets",
      );
    });

    it("should throw error when tweets is not array", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          tweets: null,
          message: "Invalid data",
        }),
      } as Response);

      await expect(getProfileTweets(userId, token)).rejects.toThrow(
        "Resposta inválida de tweets",
      );
    });

    it("should throw default error when tweets invalid and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          tweets: undefined,
        }),
      } as Response);

      await expect(getProfileTweets(userId, token)).rejects.toThrow(
        "Resposta inválida de tweets",
      );
    });
  });

  describe("profileService - getProfileReplies", () => {
    it("should return replies when response is ok", async () => {
      const mockReplies = [makeReply()];

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          replies: mockReplies,
        }),
      } as Response);

      const result = await getProfileReplies(userId, token);

      expect(result).toEqual(mockReplies);

      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/profile/${userId}/replies`,
        expect.any(Object),
      );
    });

    it("should throw error when response is not ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Unauthorized" }),
      } as Response);

      await expect(getProfileReplies(userId, token)).rejects.toThrow(
        "Unauthorized",
      );
    });

    it("should throw default error when no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(getProfileReplies(userId, token)).rejects.toThrow(
        "Failed to fetch profile replies",
      );
    });

    it("should throw error when replies invalid", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          replies: undefined,
        }),
      } as Response);

      await expect(getProfileReplies(userId, token)).rejects.toThrow(
        "Resposta inválida de replies",
      );
    });
  });

  describe("profileService - getProfileLikes", () => {
    it("should return likes when response is ok", async () => {
      const mockLikes = [makeLike()];

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          likes: mockLikes,
        }),
      } as Response);

      const result = await getProfileLikes(userId, token);

      expect(result).toEqual(mockLikes);

      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/profile/${userId}/likes`,
        expect.any(Object),
      );
    });

    it("should throw error when response is not ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Unauthorized" }),
      } as Response);

      await expect(getProfileLikes(userId, token)).rejects.toThrow(
        "Unauthorized",
      );
    });

    it("should throw default error when no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(getProfileLikes(userId, token)).rejects.toThrow(
        "Failed to fetch profile likes",
      );
    });

    it("should throw error when likes invalid", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          likes: null,
        }),
      } as Response);

      await expect(getProfileLikes(userId, token)).rejects.toThrow(
        "Resposta inválida de likes",
      );
    });
  });
});
