import { Box, Typography } from "@mui/material";
import type { ThreadItemProps } from "../types";
import { FeedCardContent } from "./FeedCardContent";

export function ThreadItem({
  root,
  replies,
  hasNestedReplies,
  onLike,
}: ThreadItemProps) {
  return (
    <Box>
      <FeedCardContent tweet={root} onLike={onLike} />

      <Box sx={{ position: "relative" }}>
        {replies.map((reply, index) => (
          <Box
            key={reply.id}
            sx={{
              position: "relative",
              pl: 4,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 16,
                top: 0,
                bottom: 0,
                width: "2px",
                bgcolor: "divider",
              }}
            />

            <FeedCardContent
              tweet={reply}
              onLike={onLike}
              showReplyLabel
              isThreadReply
              isLastReply={index === replies.length - 1}
            />

            {hasNestedReplies && reply.replies && reply.replies.length > 0 && (
              <Box sx={{ pl: 2, py: 1 }}>
                <Typography variant="body2" color="primary">
                  Ver mais respostas
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
