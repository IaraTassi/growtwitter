import { describe, it, expect } from "vitest";
import authReducer, { initialState } from "../src/features/auth/authSlice";
import { registerThunk, loginThunk } from "../src/features/auth/authThunks";

describe("authSlice", () => {
  describe("authSlice - register", () => {
    it("should set loading on register.pending", () => {
      const state = authReducer(
        initialState,
        registerThunk.pending("", {
          name: "Test User",
          userName: "testuser",
          email: "test@email.com",
          password: "123456",
          imageUrl: "",
        }),
      );

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should stop loading on register.fulfilled", () => {
      const state = authReducer(
        initialState,
        registerThunk.fulfilled(
          {
            ok: true,
            message: "Usuário criado com sucesso",
            user: {
              id: "1",
              name: "Test User",
              userName: "testuser",
              email: "test@email.com",
              imageUrl: "",
            },
          },
          "",
          {
            name: "Test User",
            userName: "testuser",
            email: "test@email.com",
            password: "123456",
            imageUrl: "",
          },
        ),
      );

      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
    });

    it("should set error on register.rejected", () => {
      const state = authReducer(
        initialState,
        registerThunk.rejected(
          new Error("Email já existe"),
          "",
          {
            name: "Test User",
            userName: "testuser",
            email: "test@email.com",
            password: "123456",
            imageUrl: "",
          },
          "Email já existe",
        ),
      );

      expect(state.loading).toBe(false);
      expect(state.error).toBe("Email já existe");
    });
  });

  describe("authSlice - login", () => {
    it("should return initial state", () => {
      const state = authReducer(undefined, { type: "unknown" });
      expect(state).toEqual(initialState);
    });

    it("should set loading on login.pending", () => {
      const state = authReducer(
        initialState,
        loginThunk.pending("", {
          identifier: "test",
          password: "123",
        }),
      );

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set user and token on login.fulfilled", () => {
      const payload = {
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

      const state = authReducer(
        initialState,
        loginThunk.fulfilled(payload, "", {
          identifier: "test",
          password: "123",
        }),
      );

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(payload.user);
      expect(state.token).toBe(payload.token);
    });

    it("should set error on login.rejected", () => {
      const state = authReducer(
        initialState,
        loginThunk.rejected(
          new Error("Invalid credentials"),
          "",
          { identifier: "test", password: "wrong" },
          "Invalid credentials",
        ),
      );

      expect(state.loading).toBe(false);
      expect(state.error).toBe("Invalid credentials");
    });
  });
});
