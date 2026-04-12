import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getUserById,
  getUsers,
} from "../../../../src/features/feed/services/userService";
import type {
  ProfileUser,
  SuggestedUser,
} from "../../../../src/features/feed/types";

describe("userService", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  const token = "fake-token";
  const userId = "user-1";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("userService - getUsers", () => {
    it("should return users when response is ok", async () => {
      const mockResponse: SuggestedUser[] = [
        {
          id: "1",
          name: "User 1",
          userName: "user1",
          email: "",
          imageUrl: "",
          createdAt: "",
          updatedAt: "",
          following: [],
          followers: [],
        },
      ];

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          users: mockResponse,
        }),
      } as Response);

      const result = await getUsers(token);

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/users`, {
        method: "GET",
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

      await expect(getUsers(token)).rejects.toThrow("Unauthorized");
    });

    it("should throw default error when response is not ok and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(getUsers(token)).rejects.toThrow("Failed to fetch users");
    });

    it("should throw error when users is not an array", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          users: null,
          message: "Invalid data",
        }),
      } as Response);

      await expect(getUsers(token)).rejects.toThrow("Invalid data");
    });

    it("should throw default error when users invalid and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          users: undefined,
        }),
      } as Response);

      await expect(getUsers(token)).rejects.toThrow(
        "Resposta não é lista de usuários",
      );
    });
  });

  describe("userService - getUserById", () => {
    it("should return user when response is ok", async () => {
      const mockUser: ProfileUser = {
        id: "user-1",
        name: "User 1",
        userName: "user1",
        email: "user1@email.com",
        imageUrl: "",
        createdAt: "",
        updatedAt: "",
        tweets: [],
        likes: [],
        followers: [],
        following: [],
      };

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          user: mockUser,
        }),
      } as Response);

      const result = await getUserById(userId, token);

      expect(result).toEqual(mockUser);

      expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/users/${userId}`, {
        method: "GET",
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

      await expect(getUserById(userId, token)).rejects.toThrow("Unauthorized");
    });

    it("should throw default error when response is not ok and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      } as Response);

      await expect(getUserById(userId, token)).rejects.toThrow(
        "Failed to fetch user",
      );
    });

    it("should throw error when user is missing in response", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "Invalid user",
        }),
      } as Response);

      await expect(getUserById(userId, token)).rejects.toThrow("Invalid user");
    });

    it("should throw default error when user is missing and no message", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as Response);

      await expect(getUserById(userId, token)).rejects.toThrow(
        "Usuário inválido",
      );
    });
  });
});
