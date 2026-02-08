import { describe, expect, it, vi } from "vitest";
import {
  createAccount,
  login,
} from "../src/features/auth/services/authServices";

describe("authService", () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

  describe("authService - login", () => {
    it("should login successfully when creadentials are valid", async () => {
      const mockResponse = {
        ok: true,
        message: "Login realizado com sucesso.",
        token: "jwt-token",
        user: {
          id: "1",
          name: "Test User",
          userName: "testuser",
          email: "test@email.com",
          imageUrl: "",
        },
      };

      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await login({
        identifier: "testuser",
        password: "123456",
      });

      expect(result).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/users/login`,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
    });

    it("should throw error when credentials are invalid", async () => {
      vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: "Invalid credentials" }),
      } as Response);

      await expect(
        login({
          identifier: "testuser",
          password: "wrongpass",
        }),
      ).rejects.toThrow("Invalid credentials");
    });
  });
});
