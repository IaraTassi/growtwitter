import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import type { FeedTweet, ProfileUser } from "../types";
import { getUserById } from "../services/userService";
import { getFeed } from "../services/feedService";
import { mapFeed } from "../mappers/feedMapper";
import { Box, Typography } from "@mui/material";
import { ProfileTimeline } from "../components/ProfileTimeline";

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const token = useSelector((state: RootState) => state.auth.token);
  const loggedUserId = useSelector((state: RootState) => state.auth.user?.id);

  const [user, setUser] = useState<ProfileUser | null>(null);
  const [tweets, setTweets] = useState<FeedTweet[]>([]);
  const [feed, setFeed] = useState<FeedTweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !token) return;

    const safeId = id;
    const safeToken = token;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [userRes, feedRes] = await Promise.all([
          getUserById(safeId, safeToken),
          getFeed(safeToken),
        ]);

        setUser(userRes);

        const normalized = mapFeed(feedRes, loggedUserId);

        setFeed(normalized);

        const profileTweets = normalized.filter((t) => t.userId === safeId);

        setTweets(profileTweets);
      } catch (error) {
        console.error(error);
        setError("Erro ao carregar perfil");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, token, loggedUserId]);

  if (loading) {
    return (
      <Box p={3}>
        <Typography>Carregando perfil...</Typography>
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box p={3}>
        <Typography color="error">
          {error ?? "Perfil não encontrado"}
        </Typography>
      </Box>
    );
  }

  return (
    <ProfileTimeline
      user={user}
      tweets={tweets}
      feed={feed}
      likes={user.likes ?? []}
    />
  );
}
