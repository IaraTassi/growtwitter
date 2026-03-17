import { Box } from "@mui/material";
import { ProfileHeader } from "./ProfileHeader";
import { useEffect, useState } from "react";
import type { ProfileTab, ProfileUser } from "../types";
import { getUsers } from "../services/userService";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileTabs } from "./ProfileTabs";
import { TweetsTab } from "./TweetsTab";
import { RepliesTab } from "./RepliesTab";
import { MediaTab } from "./MediaTab";
import { LikesTab } from "./LikesTab";

export function ProfileTimeline() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [tab, setTab] = useState<ProfileTab>("tweets");
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

  if (!user) return null;

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
      <Box>
        <ProfileBanner imageUrl={user?.imageUrl} />
      </Box>
      <Box sx={{ mt: 6 }}>
        <ProfileInfo user={user} />
      </Box>

      <Box>
        <ProfileTabs tab={tab} setTab={setTab} />
        <Box>
          {tab === "tweets" && <TweetsTab user={user} />}
          {tab === "replies" && <RepliesTab />}
          {tab === "media" && <MediaTab />}
          {tab === "likes" && <LikesTab />}
        </Box>
      </Box>
    </Box>
  );
}
