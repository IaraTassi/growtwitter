import type { FeedContentProps } from "../types";
import { FeedTabs } from "./FeedTabs";
import { FeedCardContent } from "./FeedCardContent";
import { Box, Typography } from "@mui/material";
import { ThreadItem } from "./TheadItem";
import { FeedBlock } from "./FeedBlock";

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
                <FeedBlock variant="isolated" showTopDivider key={item.root.id}>
                  <FeedCardContent tweet={item.root} onLike={onLike} />
                </FeedBlock>
              );

            case "foryou-simple":
              return (
                <FeedBlock variant="isolated" showTopDivider key={item.root.id}>
                  <FeedCardContent tweet={item.root} onLike={onLike} />
                </FeedBlock>
              );

            case "foryou-single-reply":
              return (
                <FeedBlock
                  variant="isolated"
                  showTopDivider
                  showBottomDivider
                  key={item.root.id}
                >
                  <FeedCardContent tweet={item.root} onLike={onLike} />
                  <FeedCardContent
                    tweet={item.reply}
                    onLike={onLike}
                    showReplyLabel
                  />
                </FeedBlock>
              );

            case "foryou-thread":
              return (
                <FeedBlock
                  variant="thread"
                  showTopDivider
                  showBottomDivider
                  key={item.root.id}
                >
                  <ThreadItem root={item.root} onLike={onLike} />
                </FeedBlock>
              );

            default:
              return null;
          }
        })
      )}
    </Box>
  );
}
