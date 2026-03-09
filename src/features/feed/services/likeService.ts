import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function toggleLike(token: string, tweetId: string) {
  const response = await authFetch(
    `${BASE_URL}/api/likes/${tweetId}`,
    { method: "PATCH" },
    token,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Erro ao alternar like");
  }

  return response.json();
}
