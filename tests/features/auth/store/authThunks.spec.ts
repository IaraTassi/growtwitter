import { beforeEach, describe, expect, it, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../../src/features/auth/store/authSlice";
import {
  loginThunk,
  registerThunk,
} from "../../../../src/features/auth/store/authThunks";
import * as authService from "../../../../src/features/auth/services/authServices";

type RootState = {
  auth: ReturnType<typeof authReducer>;
};

function createTestStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
}

describe("authThunks", () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe("authThunk - registerThunk", () => {
    it("should dispatch fulfilled when register succeeds", async () => {
      const mockResponse = {
        ok: true,
        message: "Conta criada",
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

      await store.dispatch(
        registerThunk({
          name: "Test User",
          userName: "testuser",
          email: "test@email.com",
          password: "123456",
          imageUrl: "",
        }),
      );

      const state: RootState = store.getState();

      expect(state.auth.loading).toBe(false);
      expect(state.auth.error).toBeNull();
    });

    it("should dispatch rejected when register fails", async () => {
      vi.spyOn(authService, "createAccount").mockRejectedValueOnce(
        new Error("Email já existe"),
      );

      await store.dispatch(
        registerThunk({
          name: "Test User",
          userName: "testuser",
          email: "test@email.com",
          password: "123456",
          imageUrl: "",
        }),
      );

      const state: RootState = store.getState();

      expect(state.auth.loading).toBe(false);
      expect(state.auth.error).toBe("Email já existe");
    });
  });

  describe("authThunks - login", () => {
    it("should dispatch fulfilled when login succeeds", async () => {
      const mockResponse = {
        ok: true,
        message: "Login ok",
        token: "jwt",
        user: {
          id: "1",
          name: "Test User",
          userName: "testuser",
          email: "test@email.com",
          imageUrl: "",
        },
      };

      vi.spyOn(authService, "login").mockResolvedValueOnce(mockResponse);

      await store.dispatch(
        loginThunk({
          identifier: "testuser",
          password: "123456",
        }),
      );

      const state: RootState = store.getState();

      expect(state.auth.token).toBe("jwt");
      expect(state.auth.user).toEqual(mockResponse.user);
    });

    it("should dispatch rejected when login fails", async () => {
      vi.spyOn(authService, "login").mockRejectedValueOnce(
        new Error("Invalid credentials"),
      );

      await store.dispatch(
        loginThunk({
          identifier: "testuser",
          password: "wrong",
        }),
      );

      const state: RootState = store.getState();

      expect(state.auth.error).toBe("Invalid credentials");
    });
  });
});
