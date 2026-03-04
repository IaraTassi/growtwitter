import type { CreateReplyApiResponse, FeedTweetResponse } from "../types";
import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function createReply(
  token: string,
  parentId: string,
  content: string,
): Promise<FeedTweetResponse> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await authFetch(`${BASE_URL}/api/tweets/${parentId}/reply`, {
    method: "POST",
    headers,
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to fetch reply");
  }

  const data: CreateReplyApiResponse = await response.json();

  if (!response.ok || !data.ok || !data.reply) {
    throw new Error(data.message || "Não foi possível criar uma resposta");
  }

  return data.reply;
}
