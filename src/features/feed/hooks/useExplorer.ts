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
      try {
        setLoading(true);

        const users = (await getUsers(token)) as UserWithFollowing[];

        const currentUser = users.find((u) => u.id === currentUserId);

        const followingIds =
          currentUser?.following?.map((f) => f.followingId) ?? [];

        const mappedUsers: SuggestedUser[] = users
          .filter((u) => u.id !== currentUserId)
          .map((u) => ({
            ...u,
            isFollowing: followingIds.includes(u.id),
          }));

        setAllUsers(mappedUsers);
      } catch (err) {
        console.error("Erro ao carregar usuários:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [token, currentUserId]);

  const suggestedUsers = useMemo(() => {
    return allUsers.filter((user) => !user.isFollowing);
  }, [allUsers]);

  const visibleUsers = useMemo(() => {
    return suggestedUsers.slice(0, limit);
  }, [suggestedUsers, limit]);

  const remaining = Math.max(suggestedUsers.length - visibleUsers.length, 0);

  const loadMore = () => setLimit((p) => p + 5);

  const handleToggleFollow = async (userId: string) => {
    const user = allUsers.find((u) => u.id === userId);
    if (!user) return;

    const isFollowing = user.isFollowing;

    await toggleFollow(userId, isFollowing, () => {
      setAllUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isFollowing: !isFollowing } : u,
        ),
      );
    });
  };

  return {
    users: visibleUsers,
    remaining,
    loading,
    loadMore,
    handleToggleFollow,
  };
}
