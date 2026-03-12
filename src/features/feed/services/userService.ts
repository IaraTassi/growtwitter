import type { SuggestedUser } from "../types";
import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function getUsers(token: string): Promise<SuggestedUser[]> {
  const response = await authFetch(
    `${BASE_URL}/api/users`,
    { method: "GET" },
    token,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to fetch users");
  }

  const data = await response.json();

  if (!Array.isArray(data.users)) {
    throw new Error(data.message ?? "Resposta não é lista de usuários");
  }

  return data.users;
}
