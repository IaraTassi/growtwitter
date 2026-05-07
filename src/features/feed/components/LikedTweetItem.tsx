import { Box, Typography, useTheme } from "@mui/material";
import type { LikedTweetItemProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { LikeIcon } from "../utils/icons/LikeIcon";
import { CalendarIcon } from "../utils/icons/CalendarIcon";
import { timeAgo } from "../utils/timeAgo";
import { ProfileLink } from "./ProfileLink";

export function LikedTweetItem({ tweet }: LikedTweetItemProps) {
  const theme = useTheme();

  return (
    <Box
      className="profile-likes"
      sx={(theme) => ({
        display: "flex",
        gap: 2,
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: theme.custom.hover.item,
        },
      })}
    >
      <ProfileLink userId={tweet.user.id}>
        <CustomAvatar imageUrl={tweet.user.imageUrl} />
      </ProfileLink>

      <Box sx={{ flex: 1 }}>
        <Box component="header" display="flex" alignItems="center" gap={1}>
          <ProfileLink userId={tweet.user.id}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 800 }}>
              {tweet.user.name}
            </Typography>
          </ProfileLink>
        </Box>

        {tweet.parent?.userName && (
          <Typography
            sx={{
              fontSize: "0.7rem",
              color: theme.custom.text.muted,
              mb: "0.1rem",
            }}
          >
            Respondendo a @{tweet.parent.userName}
          </Typography>
        )}

        <Box component="main">
          <Typography
            sx={(theme) => ({
              fontSize: "0.75rem",
              fontWeight: 400,
              mt: "0.2rem",
              color: theme.palette.text.secondary,
            })}
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
            color: theme.custom.text.muted,
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
              <LikeIcon
                clickable={false}
                forceColor={theme.custom.icon.danger}
              />
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
