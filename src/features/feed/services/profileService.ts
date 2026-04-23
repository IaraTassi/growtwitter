import type {
  ProfileLikedTweetResponseDto,
  ProfileReplyResponseDto,
  ProfileTweetResponseDto,
} from "../types";
import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getProfileTweets(
  userId: string,
  token: string,
): Promise<ProfileTweetResponseDto[]> {
  const response = await authFetch(`${BASE_URL}/api/profile/${userId}/tweets`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile tweets");
  }

  if (!Array.isArray(data.tweets)) {
    throw new Error("Resposta inválida de tweets");
  }

  return data.tweets;
}

export async function getProfileReplies(
  userId: string,
  token: string,
): Promise<ProfileReplyResponseDto[]> {
  const response = await authFetch(
    `${BASE_URL}/api/profile/${userId}/replies`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile replies");
  }

  if (!Array.isArray(data.replies)) {
    throw new Error("Resposta inválida de replies");
  }

  return data.replies;
}

export async function getProfileLikes(
  userId: string,
  token: string,
): Promise<ProfileLikedTweetResponseDto[]> {
  const response = await authFetch(`${BASE_URL}/api/profile/${userId}/likes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile likes");
  }

  if (!Array.isArray(data.likes)) {
    throw new Error("Resposta inválida de likes");
  }

  return data.likes;
}
