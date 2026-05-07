import { Box, Typography } from "@mui/material";
import { LikedTweetItem } from "./LikedTweetItem";
import type { LikesTabProps } from "../types";
import { useProfileLikes } from "../hooks/useProfileLikes";

export function LikesTab({ userId }: LikesTabProps) {
  const { data, loading } = useProfileLikes(userId);

  if (loading) {
    return (
      <Box>
        <Typography sx={{ px: 3, pt: 2 }}>Carregando curtidas...</Typography>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box className="likes-tab" sx={{ p: 4 }}>
        <Box component="header">
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1.375rem",
            }}
          >
            Você ainda não tem nenhuma curtida
          </Typography>
        </Box>
        <Box className="main">
          <Typography
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "0.625rem",
              mt: 1,
              color: theme.custom.text.muted,
            })}
          >
            Toque no coração em qualquer Tweet para demonstrar afeto. Quando
            você realizar essa ação, o resultado aparece aqui.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {data.map((tweet) => (
        <LikedTweetItem key={tweet.id} tweet={tweet} />
      ))}
    </Box>
  );
}
