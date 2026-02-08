import { describe, it, expect, vi } from "vitest";
import { createAccount } from "../src/services/authServices";

describe("authService - createAccount", () => {
  it("should must successfully create an account", async () => {
    const mockResponse = {
      ok: true,
      message: "Usuário criado com sucesso.",
      user: {
        id: "1",
        name: "Test User",
        userName: "testuser",
        email: "test@example.com",
        imageUrl: "https://img.com/user.png",
      },
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await createAccount({
      name: "Test User",
      userName: "testuser",
      email: "test@example.com",
      password: "123456",
      imageUrl: "https://img.com/user.png",
    });

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw error when api returns 400", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: "Invalid data" }),
    } as Response);

    await expect(
      createAccount({
        name: "Test User",
        userName: "",
        email: "invalid",
        password: "123456",
        imageUrl: "",
      }),
    ).rejects.toThrow("Invalid data");
  });

  it("should throw error when api returns 500", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Server error" }),
    } as Response);

    await expect(
      createAccount({
        name: "Test User",
        userName: "testuser",
        email: "test@example.com",
        password: "123456",
        imageUrl: "",
      }),
    ).rejects.toThrow("Server error");
  });
});
