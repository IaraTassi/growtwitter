import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function toggleLike(token: string, tweetId: string) {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await authFetch(`${BASE_URL}/api/likes/${tweetId}`, {
    method: "PATCH",
    headers,
  });

  if (!response.ok) {
    throw new Error("Erro ao alternar like");
  }

  return response.json();
}
