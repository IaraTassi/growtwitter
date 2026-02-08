export type CreateAccountDto = {
  name: string;
  userName: string;
  email: string;
  password: string;
  imageUrl?: string;
};

type CreateAccountResponse = {
  ok: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    userName: string;
    email: string;
    imageUrl?: string;
  };
};

export type AuthUser = {
  id: string;
  name: string;
  userName: string;
  email: string;
  imageUrl?: string;
};

export type LoginDto = {
  identifier: string;
  password: string;
};

export type LoginResponse = {
  ok: boolean;
  message: string;
  token: string;
  user: AuthUser;
};

export async function createAccount(
  data: CreateAccountDto,
): Promise<CreateAccountResponse> {
  const response = await fetch("/api/users", {
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
  const response = await fetch("/api/users/login", {
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
