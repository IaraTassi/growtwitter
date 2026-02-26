import { Box } from "@mui/material";
import type { ThreadItemProps } from "../types";
import { FeedCardContent } from "./FeedCardContent";

export function ThreadItem({ tweet, level, onLike }: ThreadItemProps) {
  if (level > 3) return null;

  return (
    <Box sx={{ marginLeft: level * 2 }}>
      {tweet.replies.map((reply) => (
        <Box key={reply.id}>
          <FeedCardContent
            tweet={reply}
            onLike={onLike}
            showReplyLabel={true}
          />

          {reply.replies?.length > 0 && (
            <ThreadItem tweet={reply} level={level + 1} onLike={onLike} />
          )}
        </Box>
      ))}
    </Box>
  );
}
