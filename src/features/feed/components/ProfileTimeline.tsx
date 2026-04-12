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

export function ProfileTimeline({
  user,
  tweets = [],
  feed = [],
  likes = [],
}: ProfileTimelineProps) {
  const [tab, setTab] = useState<ProfileTab>("tweets");

  const tweetsCount = tweets.filter((t) => !t.parentId).length;

  return (
    <Box component="section" aria-labelledby="profile-timeline-heading">
      <Box component="header" sx={{ py: 2, px: 3 }}>
        <ProfileHeader name={user.name} tweetsCount={tweetsCount} />
      </Box>

      <Box>
        <ProfileBanner imageUrl={user.imageUrl ?? ""} />
      </Box>

      <Box sx={{ mt: 6 }}>
        <ProfileInfo user={user} />
      </Box>

      <Box sx={{ mt: 2, px: 3 }}>
        <ProfileTabs tab={tab} setTab={setTab} />

        <Box>
          {tab === "tweets" && <TweetsTab tweets={tweets} user={user} />}

          {tab === "replies" && <RepliesTab tweets={feed} userId={user.id} />}

          {tab === "media" && <MediaTab />}

          {tab === "likes" && <LikesTab likes={likes} feed={feed} />}
        </Box>
      </Box>
    </Box>
  );
}
