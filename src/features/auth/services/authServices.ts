import type {
  CreateAccountDto,
  CreateAccountResponse,
  LoginDto,
  LoginResponse,
} from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createAccount(
  data: CreateAccountDto,
): Promise<CreateAccountResponse> {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to create account");
  }

  return response.json();
}

export async function login(data: LoginDto): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message ?? "Invalid credentials");
  }

  return body;
}
