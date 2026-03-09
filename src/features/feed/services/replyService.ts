import type { CreateReplyApiResponse, FeedTweetResponse } from "../types";
import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function createReply(
  token: string,
  parentId: string,
  content: string,
): Promise<FeedTweetResponse> {
  const response = await authFetch(
    `${BASE_URL}/api/tweets/${parentId}/reply`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
    },
    token,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to fetch reply");
  }

  const data: CreateReplyApiResponse = await response.json();

  if (!data.ok || !data.reply) {
    throw new Error(data.message || "Não foi possível criar uma resposta");
  }

  return data.reply;
}
