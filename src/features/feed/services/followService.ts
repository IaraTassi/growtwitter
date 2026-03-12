import { authFetch } from "./authService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function followUser(token: string, userId: string): Promise<void> {
  const response = await authFetch(
    `${BASE_URL}/api/follows/${userId}`,
    { method: "POST" },
    token,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to follow user");
  }

  await response.json();
}

export async function unfollowUser(
  token: string,
  userId: string,
): Promise<void> {
  const response = await authFetch(
    `${BASE_URL}/api/follows/${userId}`,
    { method: "DELETE" },
    token,
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Failed to unfollow user");
  }

  await response.json();
}
