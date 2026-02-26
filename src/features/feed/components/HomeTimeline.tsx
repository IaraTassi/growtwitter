import type { FeedContentProps } from "../types";
import { FeedTabs } from "./FeedTabs";
import { FeedCardContent } from "./FeedCardContent";
import { Box, Typography } from "@mui/material";
import { ThreadItem } from "./TheadItem";

export function HomeTimeline({
  feed,
  loading,
  tab,
  setTab,
  onLike,
}: FeedContentProps) {
  return (
    <Box
      component="section"
      aria-labelledby="home-timeline-heading"
      sx={{ maxWidth: 600, margin: "0 auto" }}
    >
      <Box component="header">
        <Typography component="h2" id="home-timeline-heading">
          Página Inicial
        </Typography>
        <FeedTabs tab={tab} setTab={setTab} />
      </Box>

      {loading ? (
        <p>Carregando...</p>
      ) : feed.length === 0 ? (
        <p>Nenhum tweet encontrado</p>
      ) : (
        feed.map((tweet) => (
          <Box key={tweet.id}>
            <FeedCardContent
              tweet={tweet}
              onLike={onLike}
              showReplyLabel={tab === "foryou"}
            />

            {tab === "foryou" && tweet.replies.length > 0 && (
              <ThreadItem tweet={tweet} level={0} onLike={onLike} />
            )}
          </Box>
        ))
      )}
    </Box>
  );
}
