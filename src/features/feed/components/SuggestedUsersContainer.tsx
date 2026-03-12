import { useEffect, useMemo, useState } from "react";
import type { SuggestedUser, SuggestedUsersContainerProps } from "../types";
import { getUsers } from "../services/userService";
import { Box, Typography } from "@mui/material";
import { SuggestedUsersList } from "./SuggestedUsersList";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFollow } from "../hooks/useFollow";

export function SuggestedUsersContainer({
  token,
  currentUserId,
}: SuggestedUsersContainerProps) {
  const [allUsers, setAllUsers] = useState<SuggestedUser[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const users = await getUsers(token);
        const currentUser = users.find((u) => u.id === currentUserId);
        const ids = currentUser?.following?.map((f) => f.followingId) ?? [];

        setFollowingIds(ids);
        const suggested = users.filter(
          (user) => !ids.includes(user.id) && user.id !== currentUserId,
        );

        setAllUsers(suggested);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [token, currentUserId]);

  const users = useMemo(() => {
    return allUsers.map((u) => ({
      ...u,
      isFollowing: followingIds.includes(u.id),
    }));
  }, [allUsers, followingIds]);

  const visibleUsers = users.slice(0, limit);
  const remaining = Math.max(users.length - visibleUsers.length, 0);

  const { toggleFollow } = useFollow(token);

  const handleToggleFollow = async (userId: string) => {
    const isFollowing = followingIds.includes(userId);

    await toggleFollow(userId, isFollowing, () => {
      setFollowingIds((prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId],
      );
    });
  };

  if (loading)
    return <Typography sx={{ px: 3, pt: 2 }}>Carregando...</Typography>;

  return (
    <>
      <SuggestedUsersList
        users={visibleUsers}
        onToggleFollow={handleToggleFollow}
      />

      {users.length > limit && remaining > 0 && (
        <Box
          display="flex"
          alignItems="center"
          gap={0.4}
          sx={{
            cursor: "pointer",
            px: 3,
            pt: 2,
            width: "fit-content",
            color: "text.secondary",
            fontSize: "0.75rem",
            fontWeight: 500,
            transition: "color 0.2s ease",
            "&:hover": { color: "primary.main" },
          }}
          onClick={() => setLimit((prev) => prev + 5)}
        >
          <ExpandMoreIcon fontSize="inherit" />
          <Typography fontSize="inherit">Mostrar mais ({remaining})</Typography>
        </Box>
      )}
    </>
  );
}
