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

  const clonedResponse = response.clone();

  let body;

  try {
    body = await response.json();
  } catch {
    const raw = await clonedResponse.text();

    console.error("RAW LOGIN RESPONSE:", raw);

    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(body.message ?? "Invalid credentials");
  }

  return body;
}
