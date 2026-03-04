import { Box, Typography } from "@mui/material";
import type { FeedTweet, ThreadItemProps } from "../types";
import { FeedCardContent } from "./FeedCardContent";
import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export function ThreadItem({ root, onLike }: ThreadItemProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const renderReplies = (replies: FeedTweet[], parentContinues: boolean) =>
    replies.map((reply, index) => {
      const hasChildren = reply.replies.length > 0;
      const isExpanded = expanded[reply.id];
      const isLast = index === replies.length - 1;

      const shouldContinueLine =
        !isLast || parentContinues || (hasChildren && isExpanded);

      return (
        <Box key={reply.id}>
          <FeedCardContent
            tweet={reply}
            onLike={onLike}
            showThreadLine
            isLastInThread={!shouldContinueLine}
          />

          {hasChildren && (
            <Box
              display="flex"
              alignItems="center"
              gap={0.4}
              sx={{
                cursor: "pointer",
                ml: 8,
                mb: 1,
                width: "fit-content",
                color: "text.secondary",
                fontSize: "0.75rem",
                fontWeight: 500,
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "primary.main",
                },
              }}
              onClick={() => toggleExpand(reply.id)}
            >
              {isExpanded ? (
                <ExpandLessIcon fontSize="inherit" />
              ) : (
                <ExpandMoreIcon fontSize="inherit" />
              )}

              <Typography fontSize="inherit">
                {isExpanded
                  ? "Ocultar respostas"
                  : `Ver mais respostas (${reply.replies.length})`}
              </Typography>
            </Box>
          )}

          {hasChildren && isExpanded && (
            <Box>
              {renderReplies(reply.replies, !isLast || parentContinues)}
            </Box>
          )}
        </Box>
      );
    });

  return (
    <Box>
      <FeedCardContent
        tweet={root}
        onLike={onLike}
        showThreadLine={root.replies.length > 0}
        isLastInThread={false}
      />

      {renderReplies(root.replies, false)}
    </Box>
  );
}
