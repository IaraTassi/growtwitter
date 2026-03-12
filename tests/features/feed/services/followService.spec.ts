import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  followUser,
  unfollowUser,
} from "../../../../src/features/feed/services/followService";

describe("followService", () => {
  describe("followService - followUser", () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    const token = "fake-token";
    const userId = "u1";

    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("should follow user when response is ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "Followed successfully",
        }),
      } as Response);

      await followUser(token, userId);

      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/follows/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should throw error when response is not ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Unauthorized" }),
      } as Response);

      await expect(followUser(token, userId)).rejects.toThrow("Unauthorized");
    });

    it("should throw default error when response is not ok and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(followUser(token, userId)).rejects.toThrow(
        "Failed to follow user",
      );
    });
  });

  describe("followService - unfollowUser", () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
    const token = "fake-token";
    const userId = "u1";

    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("should unfollow user when response is ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "Unfollowed successfully",
        }),
      } as Response);

      await unfollowUser(token, userId);

      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/follows/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should throw error when response is not ok", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Unauthorized" }),
      } as Response);

      await expect(unfollowUser(token, userId)).rejects.toThrow("Unauthorized");
    });

    it("should throw default error when response is not ok and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(unfollowUser(token, userId)).rejects.toThrow(
        "Failed to unfollow user",
      );
    });
  });
});
