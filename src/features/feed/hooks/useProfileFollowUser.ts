import { useState } from "react";
import type { ProfileUser } from "../types";
import { useFollow } from "./useFollow";

export function useFollowUser(user: ProfileUser, token?: string) {
  const { toggleFollow } = useFollow(token ?? "");

  const [localState, setLocalState] = useState<{
    isFollowing: boolean;
    followersCount: number;
  } | null>(null);

  const isFollowing = localState?.isFollowing ?? user.isFollowing;

  const followersCount = localState?.followersCount ?? user.followersCount ?? 0;

  const handleToggleFollow = async () => {
    if (!user.id) return;

    await toggleFollow(user.id, isFollowing, () => {
      const next = !isFollowing;

      setLocalState({
        isFollowing: next,
        followersCount: next
          ? followersCount + 1
          : Math.max(0, followersCount - 1),
      });
    });
  };

  return { isFollowing, followersCount, handleToggleFollow };
}
