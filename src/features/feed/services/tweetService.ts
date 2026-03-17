import type { CreateTweetApiResponse, TweetResponse } from "../types";
import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function createTweet(
  token: string,
  content: string,
): Promise<TweetResponse> {
  const response = await authFetch(
    `${BASE_URL}/api/tweets`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
    },
    token,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to fetch tweet");
  }

  const data: CreateTweetApiResponse = await response.json();

  if (!data.ok || !data.tweet) {
    throw new Error(data.message || "Não foi possível criar um tweet");
  }

  return data.tweet;
}

export async function deleteTweet(
  token: string,
  tweetId: string,
): Promise<void> {
  const response = await authFetch(
    `${BASE_URL}/api/tweets/${tweetId}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    },
    token,
  );

  const data: { ok: boolean; message?: string } = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || "Não foi possível deletar o tweet");
  }
}
