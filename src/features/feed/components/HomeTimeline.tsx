import { useEffect, useMemo, useState } from "react";
import type { FeedContentProps, FeedTweet, TabType } from "../types";
import { FeedTabs } from "./FeedTabs";
import { FeedCardContent } from "./FeedCardContent";
import { Box } from "@mui/material";

export function HomeTimeline({
  feed,
  loggedUserId,
  loading,
}: FeedContentProps) {
  const [tab, setTab] = useState<TabType>("foryou");
  const [localFeed, setLocalFeed] = useState<FeedTweet[]>([]);

  useEffect(() => {
    setLocalFeed(feed);
  }, [feed]);

  const handleLike = (tweetId: string) => {
    setLocalFeed((prev) =>
      prev.map((tweet) => {
        if (tweet.id !== tweetId) return tweet;

        const newIsLiked = !tweet.isLiked;

        return {
          ...tweet,
          isLiked: newIsLiked,
          likesCount: newIsLiked ? tweet.likesCount + 1 : tweet.likesCount - 1,
        };
      }),
    );
  };

  const processedFeed = useMemo(() => {
    if (tab === "foryou") {
      return localFeed;
    }

    if (!loggedUserId) {
      return [];
    }

    return [...localFeed]
      .filter((tweet) => tweet.user.id !== loggedUserId)
      .sort((a, b) => Number(b.likesCount ?? 0) - Number(a.likesCount ?? 0));
  }, [localFeed, tab, loggedUserId]);

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
          <FeedCardContent key={tweet.id} tweet={tweet} onLike={handleLike} />
        ))
      )}
    </Box>
  );
}
