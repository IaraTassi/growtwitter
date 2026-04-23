import { Box, Typography } from "@mui/material";
import type { ReplyThreadProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { ProfileLink } from "./ProfileLink";

export function ReplyThread({ node }: ReplyThreadProps) {
  const avatarSize = 28;

  return (
    <Box
      className="profile-replies"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        cursor: "default",
        px: 3,
        py: 2,
      }}
    >
      <Box component="header" display="flex" alignItems="center" gap={1}>
        <ProfileLink userId={node.user.userName}>
          <CustomAvatar
            imageUrl={node.user.imageUrl}
            width={avatarSize}
            height={avatarSize}
          />
        </ProfileLink>
        <ProfileLink userId={node.user.userName}>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 800 }}>
            {node.user.name}
          </Typography>
        </ProfileLink>
      </Box>

      <Box component="main">
        <Typography sx={{ fontSize: "0.75rem", fontWeight: 400, pl: "36px" }}>
          {node.content}
        </Typography>
      </Box>
      {node.replies.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {node.replies.map((reply) => (
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
              <ReplyThread node={reply} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
