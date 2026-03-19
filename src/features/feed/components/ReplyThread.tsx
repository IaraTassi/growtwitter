import { Box, Typography } from "@mui/material";
import type { ReplyThreadProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";

export function ReplyThread({
  root,
  replies,
  currentUserId,
}: ReplyThreadProps) {
  const avatarSize = 28;

  return (
    <Box
      key={root.id}
      className="profile-replies"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        cursor: "pointer",
        px: 3,
        py: 2,
      }}
    >
      <Box component="header" display="flex" alignItems="center" gap={1}>
        <CustomAvatar
          imageUrl={root.user.imageUrl}
          width={avatarSize}
          height={avatarSize}
        />

        <Typography sx={{ fontSize: "0.75rem", fontWeight: 800 }}>
          {root.user.name}
        </Typography>
      </Box>

      <Box component="main">
        <Typography sx={{ fontSize: "0.75rem", fontWeight: 400, pl: "36px" }}>
          {root.content}
        </Typography>
      </Box>
      {replies.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {replies.map((reply) => (
            <Box
              key={reply.id}
              sx={{
                ml: `${avatarSize / 2}px`,
                pl: 2,
                mt: 1,
                borderLeft: "2px solid",
                borderColor: "divider",
              }}
            >
              <ReplyThread
                root={reply}
                replies={reply.replies}
                currentUserId={currentUserId}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
