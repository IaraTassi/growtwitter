import type { FeedTweet } from "../types";
import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function createReply(
  token: string,
  parentId: string,
): Promise<FeedTweet[]> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await authFetch(`${BASE_URL}/api/tweets/${parentId}/reply`, {
    method: "POST",
    headers,
    body: JSON.stringify({}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reply");
  }

  if (!Array.isArray(data.feed)) {
    throw new Error(data.message || "Não foi possível criar uma resposta");
  }

  return data.feed;
}
