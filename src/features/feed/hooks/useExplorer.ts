import { useEffect, useMemo, useState } from "react";
import type { FeedUser, UseExplorerParams, UserWithFollowing } from "../types";
import { useFollow } from "./useFollow";
import { getUsers } from "../services/userService";

export function useExplorer({ token, currentUserId }: UseExplorerParams) {
  const [allUsers, setAllUsers] = useState<FeedUser[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  const { toggleFollow } = useFollow(token);

  useEffect(() => {
    if (!token || !currentUserId) return;

    const loadUsers = async () => {
      setLoading(true);

      const users = (await getUsers(token)) as UserWithFollowing[];

      const currentUser = users.find((u) => u.id === currentUserId);

      const ids = currentUser?.following?.map((f) => f.followingId) ?? [];

      setFollowingIds(ids);
      setAllUsers(users.filter((u) => u.id !== currentUserId));
      setLoading(false);
    };

    loadUsers();
  }, [token, currentUserId]);

  const suggestedUsers = useMemo(() => {
    return allUsers.filter((user) => !followingIds.includes(user.id));
  }, [allUsers, followingIds]);

  const users = useMemo(() => {
    return suggestedUsers.slice(0, limit);
  }, [suggestedUsers, limit]);

  const remaining = Math.max(suggestedUsers.length - users.length, 0);

  const loadMore = () => setLimit((p) => p + 5);

  const handleToggleFollow = async (userId: string) => {
    const isFollowing = followingIds.includes(userId);

    await toggleFollow(userId, isFollowing, () => {
      setFollowingIds((prev) =>
        isFollowing ? prev.filter((id) => id !== userId) : [...prev, userId],
      );

      if (!isFollowing) {
        setAllUsers((prev) => prev.filter((u) => u.id !== userId));
      }
    });
  };

  return {
    users,
    remaining,
    loading,
    loadMore,
    handleToggleFollow,
  };
}
