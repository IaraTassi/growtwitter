import { Box, Typography } from "@mui/material";
import type { LikeProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { LikeIcon } from "../utils/icons/LikeIcon";
import { CalendarIcon } from "../utils/icons/CalendarIcon";
import { timeAgo } from "../utils/timeAgo";
import { COLORS } from "../../../theme/colors";

export function LikedTweetItem({ tweet }: LikeProps) {
  return (
    <Box
      className="profile-likes"
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        transition: "background 0.2s ease",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <CustomAvatar imageUrl={tweet.user.imageUrl} />

      <Box sx={{ flex: 1 }}>
        <Box component="header" display="flex" alignItems="center" gap={1}>
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 800 }}>
            {tweet.user.name}
          </Typography>
        </Box>

        <Box component="main">
          <Typography
            sx={{ fontSize: "0.75rem", fontWeight: 400, mt: "0.2rem" }}
          >
            {tweet.content}
          </Typography>
        </Box>

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
              <Typography
                variant="caption"
                sx={{ paddingTop: "0.2rem", opacity: 0.5 }}
              >
                •
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <LikeIcon clickable={false} forceColor={COLORS.iconLike} />
              <Typography variant="caption" sx={{ paddingTop: "0.2rem" }}>
                {tweet.likesCount}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
