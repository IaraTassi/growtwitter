import { useState } from "react";
import type { ProfileUser } from "../types";
import { useFollow } from "./useFollow";

export function useFollowUser(
  user: ProfileUser,
  loggedUserId?: string,
  token?: string,
) {
  const { toggleFollow } = useFollow(token ?? "");

  const baseIsFollowing =
    user.followers?.some((f) => f.followerId === loggedUserId) ?? false;

  const [isFollowing, setIsFollowing] = useState(baseIsFollowing);

  const [followersCount, setFollowersCount] = useState(
    user.followersCount ?? 0,
  );

  const handleToggleFollow = async () => {
    if (!user.id) return;

    await toggleFollow(user.id, isFollowing, () => {
      setIsFollowing((prev) => {
        const next = !prev;

        setFollowersCount((c) => (next ? c + 1 : Math.max(0, c - 1)));

        return next;
      });
    });
  };

  return { isFollowing, followersCount, handleToggleFollow };
}
