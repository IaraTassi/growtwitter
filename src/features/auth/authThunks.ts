import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  CreateAccountDto,
  CreateAccountResponse,
  LoginDto,
  LoginResponse,
} from "./types";
import { createAccount } from "./services/authServices";
import { login as loginService } from "./services/authServices";

export const registerThunk = createAsyncThunk<
  CreateAccountResponse,
  CreateAccountDto,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    return await createAccount(data);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unexpected error");
  }
});

export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginDto,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    return await loginService(data);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unexpected error");
  }
});
