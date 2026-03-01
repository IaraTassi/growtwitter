import { Box } from "@mui/material";
import type { ThreadItemProps } from "../types";
import { FeedCardContent } from "./FeedCardContent";

export function ThreadItem({
  tweet,
  level,
  onLike,
  rootRepliesCount,
}: ThreadItemProps) {
  const MAX_THREAD_LEVEL = 3;
  if (level > MAX_THREAD_LEVEL) return null;
  const isSingleReply =
    level === 1 && rootRepliesCount === 1 && tweet.replies.length === 0;

  return (
    <Box sx={{ marginLeft: level * 2 }}>
      {level > 0 && (
        <FeedCardContent
          tweet={tweet}
          onLike={onLike}
          showReplyLabel={isSingleReply}
        />
      )}

      {tweet.replies.map((reply) => (
        <ThreadItem
          key={reply.id}
          tweet={reply}
          level={level + 1}
          onLike={onLike}
          rootRepliesCount={rootRepliesCount}
        />
      ))}
    </Box>
  );
}
