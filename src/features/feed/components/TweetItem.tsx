import { Box, Typography } from "@mui/material";
import type { TweetItemProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { CalendarIcon } from "../utils/icons/CalendarIcon";
import { timeAgo } from "../utils/timeAgo";
import { ReplyIcon } from "../utils/icons/ReplyIcon";
import { COLORS } from "../../../theme/colors";
import { TrashIcon } from "../utils/icons/TrashIcon";

export function TweetItem({
  tweet,
  avatarSize,
  onReply,
  onDelete,
}: TweetItemProps) {
  return (
    <Box
      className="profile-tweets"
      sx={{
        display: "flex",
        gap: 2,
        px: 3,
        py: 2,
        borderBottom: 1,
        borderColor: "divider",
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "action.hover",
          "& .delete-icon": { opacity: 1 },
        },
      }}
    >
      <CustomAvatar
        imageUrl={tweet.user.imageUrl}
        width={avatarSize}
        height={avatarSize}
      />

      <Box component="main" sx={{ flex: 1 }}>
        <Typography sx={{ fontSize: "0.75rem", fontWeight: 400 }}>
          {tweet.content}
        </Typography>

        <Box
          component="footer"
          sx={{
            display: "flex",
            marginTop: "0.3rem",
            gap: 4,
            color: "text.disabled",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarIcon />
              <Typography variant="caption" sx={{ paddingTop: "0.2rem" }}>
                {timeAgo(tweet.createdAt)}
              </Typography>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              gap={1}
              onClick={() => onReply(tweet.id)}
              sx={{ cursor: "pointer" }}
            >
              <ReplyIcon />
              <Typography variant="caption" sx={{ paddingTop: "0.2rem" }}>
                {tweet.repliesCount ?? 0}
              </Typography>
            </Box>
          </Box>

          <Box
            className="delete-icon"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              opacity: 0,
              transition: "opacity 0.2s",
              cursor: "pointer",
              "&:hover svg": { fill: COLORS.error },
            }}
            onClick={() => onDelete(tweet.id)}
          >
            <TrashIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
