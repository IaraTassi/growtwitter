import { Box } from "@mui/material";
import { ProfileHeader } from "./ProfileHeader";
import { useState } from "react";
import type { ProfileTab, ProfileTimelineProps } from "../types";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileTabs } from "./ProfileTabs";
import { TweetsTab } from "./TweetsTab";
import { RepliesTab } from "./RepliesTab";
import { MediaTab } from "./MediaTab";
import { LikesTab } from "./LikesTab";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useFollowUser } from "../hooks/useProfileFollowUser";

import { useLogout } from "../hooks/useLogout";
import { ConfirmDialog } from "./ConfirmDialog";

export function ProfileTimeline({ user }: ProfileTimelineProps) {
  const { open, requestLogout, confirmLogout, cancelLogout } = useLogout();

  const [tab, setTab] = useState<ProfileTab>("tweets");

  const tweetsCount = user.tweetsCount ?? 0;

  const token = useSelector((s: RootState) => s.auth.token);

  const { isFollowing, followersCount, handleToggleFollow } = useFollowUser(
    user,
    token ?? undefined,
  );

  return (
    <Box component="section" aria-labelledby="profile-timeline-heading">
      <Box component="header" sx={{ py: 2, px: 3 }}>
        <ProfileHeader name={user.name} tweetsCount={tweetsCount} />
      </Box>

      <Box>
        <ProfileBanner imageUrl={user.imageUrl ?? ""} />
      </Box>

      <Box sx={{ mt: 6 }}>
        <ProfileInfo
          user={user}
          followersCount={followersCount}
          isFollowing={isFollowing}
          onToggleFollow={handleToggleFollow}
          onLogout={requestLogout}
        />

        <ConfirmDialog
          open={open}
          title="Sair da conta?"
          description="Você precisará fazer login novamente."
          confirmLabel="Sair"
          cancelLabel="Cancelar"
          onConfirm={confirmLogout}
          onClose={cancelLogout}
        />
      </Box>

      <Box>
        <ProfileTabs tab={tab} setTab={setTab} />

        <Box>
          {tab === "tweets" && <TweetsTab userId={user.id} />}

          {tab === "replies" && <RepliesTab userId={user.id} />}

          {tab === "media" && <MediaTab />}

          {tab === "likes" && <LikesTab userId={user.id} />}
        </Box>
      </Box>
    </Box>
  );
}
