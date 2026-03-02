import type { FeedContentProps } from "../types";
import { FeedTabs } from "./FeedTabs";
import { FeedCardContent } from "./FeedCardContent";
import { Box, Typography } from "@mui/material";
import { ThreadItem } from "./TheadItem";

export function HomeTimeline({
  items,
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
      ) : items.length === 0 ? (
        <p>Nenhum tweet encontrado</p>
      ) : (
        items.map((item) => {
          switch (item.kind) {
            case "following":
              return (
                <FeedCardContent
                  key={item.root.id}
                  tweet={item.root}
                  onLike={onLike}
                />
              );

            case "foryou-simple":
              return (
                <Box key={item.root.id}>
                  <FeedCardContent tweet={item.root} onLike={onLike} />

                  {item.replies.map((reply) => (
                    <FeedCardContent
                      key={reply.id}
                      tweet={reply}
                      onLike={onLike}
                      showReplyLabel
                    />
                  ))}
                </Box>
              );

            case "foryou-thread":
              return (
                <ThreadItem
                  key={item.root.id}
                  root={item.root}
                  replies={item.replies}
                  hasNestedReplies={item.hasNestedReplies}
                  onLike={onLike}
                />
              );

            default:
              return null;
          }
        })
      )}
    </Box>
  );
}
