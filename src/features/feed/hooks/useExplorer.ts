import { useEffect, useMemo, useState } from "react";
import type {
  SuggestedUser,
  UseExplorerParams,
  UserWithFollowing,
} from "../types";
import { useFollow } from "./useFollow";
import { getUsers } from "../services/userService";

export function useExplorer({ token, currentUserId }: UseExplorerParams) {
  const [allUsers, setAllUsers] = useState<SuggestedUser[]>([]);
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

      const suggested = users.filter(
        (user) => user.id !== currentUserId && !ids.includes(user.id),
      );

      setAllUsers(
        suggested.map((u) => ({
          ...u,
          isFollowing: false,
        })),
      );

      setLoading(false);
    };

    loadUsers();
  }, [token, currentUserId]);

  const users = useMemo(() => {
    return allUsers.slice(0, limit);
  }, [allUsers, limit]);

  const remaining = Math.max(allUsers.length - users.length, 0);

  const loadMore = () => setLimit((p) => p + 5);

  const handleToggleFollow = async (userId: string) => {
    const user = allUsers.find((u) => u.id === userId);

    if (!user) return;

    await toggleFollow(userId, user.isFollowing, () => {
      setAllUsers((prev) => prev.filter((u) => u.id !== userId));
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
