import { Box, Typography } from "@mui/material";
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
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { fetchFeed } from "../store/feedThunks";
import { selectFeedLoading } from "../store/feedSelectors";

export function ProfileTimeline() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [tab, setTab] = useState<ProfileTab>("tweets");
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const feedLoading = useSelector(selectFeedLoading);
  const [error, setError] = useState<string | null>(null);

  const allTweets = useSelector((state: RootState) => state.feed.tweets ?? []);

  const tweetsCount = user
    ? allTweets.filter((t) => t.user.id === user.id && t.parentId == null)
        .length
    : 0;

  useEffect(() => {
    if (token) {
      dispatch(fetchFeed());
    }
  }, [dispatch, token]);

  useEffect(() => {
    async function loadUser() {
      if (!id || !token) return;

      setLoading(true);
      setError(null);

      try {
        const users = await getUsers(token);
        const profileUser = users.find((u) => u.id === id);

        if (!profileUser) {
          setError("Perfil não encontrado");
          setUser(null);
        } else {
          setUser(profileUser as ProfileUser);
        }
      } catch {
        setError("Erro ao carregar perfil");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id, token]);

  return (
    <Box component="section" aria-labelledby="profile-timeline-heading">
      <Box component="header" sx={{ py: 2, px: 3 }}>
        <ProfileHeader
          name={user?.name ?? "Carregando..."}
          tweetsCount={tweetsCount}
        />
      </Box>

      <Box>
        <ProfileBanner imageUrl={user?.imageUrl ?? ""} />
      </Box>

      <Box sx={{ mt: 6 }}>{user && <ProfileInfo user={user} />}</Box>

      <Box sx={{ mt: 2, px: 3 }}>
        {loading ? (
          <Typography>Carregando...</Typography>
        ) : error ? (
          <Typography sx={{ color: "error.main" }}>{error}</Typography>
        ) : (
          <Box>
            <ProfileTabs tab={tab} setTab={setTab} />
            <Box>
              {feedLoading ? (
                <Typography>Carregando tweets...</Typography>
              ) : (
                <>
                  {tab === "tweets" && user && <TweetsTab user={user} />}
                  {tab === "replies" && user && <RepliesTab />}
                  {tab === "media" && <MediaTab />}
                  {tab === "likes" && <LikesTab />}
                </>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
