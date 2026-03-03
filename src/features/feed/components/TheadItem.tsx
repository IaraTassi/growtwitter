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

      <Box>
        {replies.map((reply, index) => (
          <Box key={reply.id}>
            <FeedCardContent
              tweet={reply}
              onLike={onLike}
              showReplyLabel
              isThreadReply
              isLastReply={index === replies.length - 1}
            />

            {hasNestedReplies && reply.replies && reply.replies.length > 0 && (
              <Box sx={{ pl: 12 }}>
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
