import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  clearAuth,
  loadAuth,
  saveAuth,
} from "../../../../src/features/auth/store/authStorage";
import type { AuthUser } from "../../../../src/features/auth/types";

describe("authStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("saveAuth", () => {
    it("should save token and user in localStorage", () => {
      const user: AuthUser = {
        id: "1",
        name: "John",
        userName: "",
        email: "",
      };

      saveAuth("token-123", user);

      expect(localStorage.getItem("token")).toBe("token-123");
      expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
    });
  });

  describe("clearAuth", () => {
    it("should remove token and user from localStorage", () => {
      localStorage.setItem("token", "token-123");
      localStorage.setItem("user", JSON.stringify({ id: "1" }));

      clearAuth();

      expect(localStorage.getItem("token")).toBeNull();
      expect(localStorage.getItem("user")).toBeNull();
    });
  });

  describe("loadAuth", () => {
    it("should return parsed auth when data exists", () => {
      const user = { id: "1", name: "John" };

      localStorage.setItem("token", "token-123");
      localStorage.setItem("user", JSON.stringify(user));

      const result = loadAuth();

      expect(result).toEqual({
        token: "token-123",
        user,
      });
    });

    it("should return null values when JSON.parse fails", () => {
      localStorage.setItem("token", "token-123");
      localStorage.setItem("user", "{ invalid json");

      const result = loadAuth();

      expect(result).toEqual({
        token: null,
        user: null,
      });
    });

    it("should handle missing token but valid user", () => {
      localStorage.setItem("user", JSON.stringify({ id: "1" }));

      const result = loadAuth();

      expect(result).toEqual({
        token: null,
        user: { id: "1" },
      });
    });

    it("should handle missing user but valid token", () => {
      localStorage.setItem("token", "token-123");

      const result = loadAuth();

      expect(result).toEqual({
        token: "token-123",
        user: null,
      });
    });

    it("should catch unexpected errors and return null state", () => {
      const spy = vi
        .spyOn(localStorage.__proto__, "getItem")
        .mockImplementation(() => {
          throw new Error("storage error");
        });

      const result = loadAuth();

      expect(result).toEqual({
        token: null,
        user: null,
      });

      spy.mockRestore();
    });
  });
});
