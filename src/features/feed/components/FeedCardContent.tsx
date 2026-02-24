import { Box, Typography } from "@mui/material";
import type { FeedCardContentProps } from "../types";
import { timeAgo } from "../utils/timeAgo";
import { VerifyIcon } from "../utils/icons/VerifyIcon";
import { CustomAvatar } from "../utils/icons/CustomAvatar";

export function FeedCardContent({ tweet }: FeedCardContentProps) {
  const hasAvatar = Boolean(tweet.user.imageUrl);
  const variant = hasAvatar ? "primary" : "secondary";

  return (
    <Box
      component="article"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        paddingY: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="header"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          marginBottom: 1,
        }}
      >
        <CustomAvatar imageUrl={tweet.user.imageUrl} />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "0.75rem",
              fontWeight: "800",
            }}
          >
            {tweet.user.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
            <VerifyIcon variant={variant} sx={{ width: 12, height: 12 }} />
            <Typography
              variant="caption"
              color="text.disabled"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              @{tweet.user.userName} • {timeAgo(tweet.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box component="div" sx={{ marginBottom: 1 }}>
        <Typography variant="body2">{tweet.content}</Typography>
      </Box>

      <Box
        component="footer"
        sx={{
          display: "flex",
          gap: 2,
          fontSize: 14,
          color: "text.secondary",
        }}
      >
        <Typography variant="caption">💬 {tweet.repliesCount}</Typography>
        <Typography variant="caption">❤️ {tweet.likesCount}</Typography>
      </Box>
    </Box>
  );
}
