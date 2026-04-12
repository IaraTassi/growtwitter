import { Box, Typography } from "@mui/material";
import { LikedTweetItem } from "./LikedTweetItem";
import { flattenTweets } from "../utils/tweetUtils";
import type { LikesTabProps } from "../types";

export function LikesTab({ likes, feed }: LikesTabProps) {
  const likedIds = new Set(likes.map((l) => l.tweetId));

  const allTweets = flattenTweets(feed);

  const likedTweets = allTweets.filter((t) => likedIds.has(t.id));

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
