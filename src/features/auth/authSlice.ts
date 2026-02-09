import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types";
import { loginThunk, registerThunk } from "./authThunks";
import { loadAuth, clearAuth, saveAuth } from "./authStorage";

const persistedAuth = loadAuth();

export const initialState: AuthState = {
  user: persistedAuth.user,
  token: persistedAuth.token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;

      clearAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro ao criar conta";
      })

      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        saveAuth(action.payload.token, action.payload.user);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro ao fazer login";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
