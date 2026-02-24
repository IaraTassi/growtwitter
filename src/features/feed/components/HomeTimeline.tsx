import { useMemo, useState } from "react";
import type { FeedContentProps, TabType } from "../types";
import { FeedTabs } from "./FeedTabs";
import { FeedCardContent } from "./FeedCardContent";
import { Box } from "@mui/material";

export function HomeTimeline({
  feed,
  loggedUserId,
  loading,
}: FeedContentProps) {
  const [tab, setTab] = useState<TabType>("foryou");

  const processedFeed = useMemo(() => {
    if (tab === "foryou") {
      return feed;
    }

    if (!loggedUserId) {
      return [];
    }

    return [...feed]
      .filter((tweet) => tweet.user.id !== loggedUserId)
      .sort((a, b) => Number(b.likesCount ?? 0) - Number(a.likesCount ?? 0));
  }, [feed, tab, loggedUserId]);

  return (
    <Box
      component="section"
      aria-labelledby="home-timeline-heading"
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <header>
        <h2 id="home-timeline-heading">Página Inicial</h2>
        <FeedTabs tab={tab} setTab={setTab} />
      </header>

      {loading ? (
        <p>Carregando...</p>
      ) : processedFeed.length === 0 ? (
        <p>Nenhum tweet encontrado</p>
      ) : (
        processedFeed.map((tweet) => (
          <FeedCardContent key={tweet.id} tweet={tweet} />
        ))
      )}
    </Box>
  );
}
