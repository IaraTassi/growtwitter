import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUsers } from "../../../../src/features/feed/services/userService";
import type { SuggestedUser } from "../../../../src/features/feed/types";

describe("userService - getUsers", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  const token = "fake-token";

  beforeEach(() => {
    vi.restoreAllMocks();
  });

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
