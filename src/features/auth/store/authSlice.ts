import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, HydratePayload } from "../types";
import { loginThunk, registerThunk } from "../store/authThunks";
import { clearAuth, saveAuth } from "../store/authStorage";

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.hydrated = true;

      clearAuth();
    },

    hydrate(state, action: PayloadAction<HydratePayload>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.hydrated = true;
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
        state.hydrated = true;

        saveAuth(action.payload.token, action.payload.user);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro ao fazer login";
        state.hydrated = true;
      });
  },
});

export const { logout, hydrate } = authSlice.actions;
export default authSlice.reducer;
