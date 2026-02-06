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
