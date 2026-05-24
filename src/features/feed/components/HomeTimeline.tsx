import type { FeedContentProps } from "../types";
import { FeedTabs } from "./FeedTabs";
import { FeedCardContent } from "./FeedCardContent";
import { Box, Typography } from "@mui/material";
import { ThreadList } from "./TheadList";
import { FeedBlock } from "./FeedBlock";
import { useState } from "react";
import { ComposerModal } from "./ComposerModal";

export function HomeTimeline({
  items,
  loading,
  tab,
  setTab,
  onLike,
  onReply,
  userImageUrl,
}: FeedContentProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [replyParentId, setReplyParentId] = useState<string | null>(null);

  const handleOpenReply = (tweetId: string) => {
    setReplyParentId(tweetId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setReplyParentId(null);
  };

  const handleSubmitReply = (content: string) => {
    if (!replyParentId) return;

    onReply(replyParentId, content);

    setModalOpen(false);
    setReplyParentId(null);
  };

  return (
    <Box
      data-cy="home-timeline"
      component="section"
      aria-labelledby="home-timeline-heading"
    >
      <Box component="header" sx={{ pt: 2, px: 3 }}>
        <Typography component="h2" id="home-timeline-heading">
          Página Inicial
        </Typography>
        <FeedTabs tab={tab} setTab={setTab} />
      </Box>

      {loading ? (
        <Typography sx={{ px: 3, pt: 2 }}>Carregando...</Typography>
      ) : items.length === 0 ? (
        <Typography sx={{ px: 3, pt: 2 }}>Nenhum tweet encontrado</Typography>
      ) : (
        items.map((item) => {
          switch (item.kind) {
            case "following":
              return (
                <FeedBlock variant="isolated" showTopDivider key={item.root.id}>
                  <FeedCardContent
                    tweet={item.root}
                    onLike={onLike}
                    onReplyClick={handleOpenReply}
                  />
                </FeedBlock>
              );

            case "foryou-simple":
              return (
                <FeedBlock variant="isolated" showTopDivider key={item.root.id}>
                  <FeedCardContent
                    tweet={item.root}
                    onLike={onLike}
                    onReplyClick={handleOpenReply}
                  />
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
                  <FeedCardContent
                    tweet={item.root}
                    onLike={onLike}
                    onReplyClick={handleOpenReply}
                  />
                  <FeedCardContent
                    tweet={item.reply}
                    parentTweet={item.root}
                    onLike={onLike}
                    onReplyClick={handleOpenReply}
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
                  <ThreadList
                    root={item.root}
                    onLike={onLike}
                    onReplyClick={handleOpenReply}
                  />
                </FeedBlock>
              );

            default:
              return null;
          }
        })
      )}
      <ComposerModal
        open={modalOpen}
        onClose={handleCloseModal}
        userImageUrl={userImageUrl}
        submitLabel="Responder"
        onSubmit={handleSubmitReply}
      />
    </Box>
  );
}
