import { describe, expect, it, vi } from "vitest";
import {
  loginThunk,
  registerThunk,
} from "../../../../src/features/auth/store/authThunks";
import * as authService from "../../../../src/features/auth/services/authServices";

describe("authThunks", () => {
  describe("authThunk - registerThunk", () => {
    it("should dispatch fulfilled when register succeeds", async () => {
      const mockResponse = {
        ok: true,
        message: "Conta criada com sucesso.",
        user: {
          id: "1",
          name: "Test User",
          userName: "testuser",
          email: "test@email.com",
          imageUrl: "",
        },
      };

      vi.spyOn(authService, "createAccount").mockResolvedValueOnce(
        mockResponse,
      );

      const dispatch = vi.fn();
      const getState = vi.fn();

      const result = await registerThunk({
        name: "Test User",
        userName: "testuser",
        email: "test@email.com",
        password: "123456",
      })(dispatch, getState, undefined);

      expect(authService.createAccount).toHaveBeenCalledWith({
        name: "Test User",
        userName: "testuser",
        email: "test@email.com",
        password: "123456",
      });

      expect(result.type).toBe("auth/register/fulfilled");
      expect(result.payload).toEqual(mockResponse);
    });

    it("should dispatch rejected when register fails", async () => {
      vi.spyOn(authService, "createAccount").mockRejectedValueOnce(
        new Error("Email já existe"),
      );

      const dispatch = vi.fn();
      const getState = vi.fn();

      const result = await registerThunk({
        name: "Test User",
        userName: "testuser",
        email: "test@email.com",
        password: "123456",
      })(dispatch, getState, undefined);

      expect(result.type).toBe("auth/register/rejected");
      expect(result.payload).toBe("Email já existe");
    });
  });

  describe("authThunks - login", () => {
    it("should dispatch fulfilled when login succeeds", async () => {
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

      vi.spyOn(authService, "login").mockResolvedValueOnce(mockResponse);

      const dispatch = vi.fn();
      const getState = vi.fn();

      const result = await loginThunk({
        identifier: "testuser",
        password: "123456",
      })(dispatch, getState, undefined);

      expect(authService.login).toHaveBeenCalledWith({
        identifier: "testuser",
        password: "123456",
      });

      expect(result.type).toBe("auth/login/fulfilled");
      expect(result.payload).toEqual(mockResponse);
    });

    it("should dispatch rejected when login fails", async () => {
      vi.spyOn(authService, "login").mockRejectedValueOnce(
        new Error("Invalid credentials"),
      );

      const dispatch = vi.fn();
      const getState = vi.fn();

      const result = await loginThunk({
        identifier: "testuser",
        password: "wrongpass",
      })(dispatch, getState, undefined);

      expect(result.type).toBe("auth/login/rejected");
      expect(result.payload).toBe("Invalid credentials");
    });
  });
});
