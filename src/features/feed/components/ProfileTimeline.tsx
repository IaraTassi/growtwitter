import { Box } from "@mui/material";
import { ProfileHeader } from "./ProfileHeader";
import { useEffect, useState } from "react";
import type { ProfileUser } from "../types";
import { getUsers } from "../services/userService";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { ProfileBanner } from "./ProfileBanner";

export function ProfileTimeline() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    async function loadUser() {
      if (!token || !currentUser) return;

      const users = await getUsers(token);
      const profileUser = users.find((user) => user.id === currentUser.id);

      if (profileUser) {
        setUser(profileUser as ProfileUser);
      }
    }

    loadUser();
  }, [token, currentUser]);
  return (
    <Box component="section" aria-labelledby="profile-timeline-heading">
      <Box component="header" sx={{ py: 2, px: 3 }}>
        {user && (
          <ProfileHeader
            name={user.name}
            tweetsCount={user.tweets.length ?? 0}
          />
        )}
      </Box>
      <ProfileBanner imageUrl={user?.imageUrl} />
    </Box>
  );
}
