import { useState } from "react";
import type { ProfileUser } from "../types";
import { useFollow } from "./useFollow";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export function useFollowUser(user: ProfileUser, token?: string) {
  const loggedUserId = useSelector((s: RootState) => s.auth.user?.id);

  const { toggleFollow } = useFollow(token ?? "");

  const baseIsFollowing =
    user.followers?.some((follower) => follower.followerId === loggedUserId) ??
    false;

  const [optimisticState, setOptimisticState] = useState<{
    userId: string;
    isFollowing: boolean;
    followersCount: number;
  } | null>(null);

  const isCurrentUserState = optimisticState?.userId === user.id;

  const isFollowing = isCurrentUserState
    ? optimisticState.isFollowing
    : baseIsFollowing;

  const followersCount = isCurrentUserState
    ? optimisticState.followersCount
    : (user.followersCount ?? 0);

  const handleToggleFollow = async () => {
    if (!user.id) return;

    await toggleFollow(user.id, isFollowing, () => {
      const next = !isFollowing;

      setOptimisticState({
        userId: user.id,
        isFollowing: next,
        followersCount: next
          ? followersCount + 1
          : Math.max(0, followersCount - 1),
      });
    });
  };

  return {
    isFollowing,
    followersCount,
    handleToggleFollow,
  };
}
