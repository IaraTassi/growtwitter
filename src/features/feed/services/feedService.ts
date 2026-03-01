import type { FeedTweet } from "../types";
import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function getFeed(token: string): Promise<FeedTweet[]> {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await authFetch(`${BASE_URL}/api/tweets/feed`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to fetch feed");
  }

  const data = await response.json();

  if (!Array.isArray(data.feed)) {
    throw new Error(data.message ?? "Resposta não é lista de tweets");
  }

  return data.feed as FeedTweet[];
}
