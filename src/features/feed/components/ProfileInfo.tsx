import { Box, Typography } from "@mui/material";
import type { ProfileInfoProps } from "../types";
import { CalendarIcon } from "../utils/icons/CalendarIcon";
import { formatJoinDate } from "../utils/timeAgo";

export function ProfileInfo({ user }: ProfileInfoProps) {
  const followersCount = user.followers?.length ?? 0;
  const followingCount = user.following?.length ?? 0;

  return (
    <Box sx={{ px: 3, py: 1 }}>
      <Typography
        component="h1"
        sx={{ fontSize: "0.875rem", fontWeight: 800, lineHeight: 1.2 }}
      >
        {user.name}
      </Typography>
      <Typography
        component="span"
        sx={{
          display: "block",
          color: "text.disabled",
          fontSize: "0.625rem",
          fontWeight: 500,
          mb: 1,
        }}
      >
        @{user.userName}
      </Typography>

      <Box display="flex" alignItems="center" gap={0.5} sx={{ mb: 1 }}>
        <CalendarIcon />
        <Typography
          component="span"
          sx={{
            color: "text.disabled",
            fontSize: "0.625rem",
            fontWeight: 500,
          }}
        >
          {formatJoinDate(user.createdAt)}
        </Typography>
      </Box>

      <Box display="flex" gap={2.5}>
        <Box>
          <Typography
            component="span"
            sx={{ fontWeight: 700, fontSize: "0.625rem", mr: 0.5 }}
          >
            {followingCount}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontWeight: 500,
              fontSize: "0.625rem",
              color: "text.disabled",
            }}
          >
            Seguindo
          </Typography>
        </Box>

        <Box>
          <Typography
            component="span"
            sx={{ fontWeight: 700, fontSize: "0.625rem", mr: 0.5 }}
          >
            {followersCount}
          </Typography>
          <Typography
            component="span"
            sx={{
              fontWeight: 500,
              fontSize: "0.625rem",
              color: "text.disabled",
            }}
          >
            Seguidores
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
