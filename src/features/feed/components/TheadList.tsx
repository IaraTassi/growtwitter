import { Box, Typography } from "@mui/material";
import type { FeedTweet, ThreadListProps } from "../types";
import { FeedCardContent } from "./FeedCardContent";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useExpanded } from "../hooks/useExpanded";

export function ThreadList({ root, onLike, onReplyClick }: ThreadListProps) {
  const { toggle, isExpanded } = useExpanded();

  const renderReplies = (replies: FeedTweet[]) =>
    replies.map((reply) => {
      const hasChildren = (reply.replies?.length ?? 0) > 0;
      const expanded = isExpanded(reply.id);

      return (
        <Box key={reply.id}>
          <FeedCardContent
            tweet={reply}
            onLike={onLike}
            onReplyClick={onReplyClick}
            showThreadLine
            isLastInThread={!hasChildren || !expanded}
          />

          {hasChildren && (
            <Box
              display="flex"
              alignItems="center"
              gap={0.4}
              sx={(theme) => ({
                cursor: "pointer",
                ml: 8,
                mb: 1,
                width: "fit-content",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: theme.palette.text.secondary,
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: theme.custom.hover.item,
                },
              })}
              onClick={() => toggle(reply.id)}
            >
              {expanded ? (
                <ExpandLessIcon fontSize="inherit" />
              ) : (
                <ExpandMoreIcon fontSize="inherit" />
              )}

              <Typography fontSize="inherit">
                {expanded
                  ? "Ocultar respostas"
                  : `Ver mais respostas (${reply.replies.length})`}
              </Typography>
            </Box>
          )}

          {hasChildren && expanded && <Box>{renderReplies(reply.replies)}</Box>}
        </Box>
      );
    });

  return (
    <Box>
      <FeedCardContent
        tweet={root}
        onLike={onLike}
        onReplyClick={onReplyClick}
        showThreadLine={root.replies.length > 0}
        isLastInThread={root.replies.length === 0}
      />

      {renderReplies(root.replies)}
    </Box>
  );
}
