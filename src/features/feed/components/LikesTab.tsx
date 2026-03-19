import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/redux";
import { selectLikedTweets } from "../store/feedSelectors";
import { LikedTweetItem } from "./LikedTweetItem";

export function LikesTab() {
  const likedTweets = useAppSelector(selectLikedTweets);

  if (likedTweets.length === 0) {
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
            sx={{
              fontWeight: 500,
              fontSize: "0.625rem",
              color: "text.disabled",
              mt: 1,
            }}
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
      {likedTweets.map((tweet) => (
        <LikedTweetItem key={tweet.id} tweet={tweet} />
      ))}
    </Box>
  );
}
