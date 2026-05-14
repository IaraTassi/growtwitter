import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import type { ProfileInfoProps } from "../types";
import { CalendarIcon } from "../utils/icons/CalendarIcon";
import { formatJoinDate } from "../utils/timeAgo";
import { PrimaryButton } from "./PrimaryButton";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export function ProfileInfo({
  user,
  followersCount,
  isFollowing,
  onToggleFollow,
  onLogout,
}: ProfileInfoProps) {
  const loggedUserId = useSelector((s: RootState) => s.auth.user?.id);

  const isOwnProfile = loggedUserId === user.id;

  const theme = useTheme();

  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        sx={(theme) => ({
          display: "block",
          fontSize: "0.625rem",
          fontWeight: 500,
          mb: 1,
          color: theme.custom.text.muted,
        })}
      >
        @{user.userName}
      </Typography>

      <Box display="flex" alignItems="center" gap={0.5} sx={{ mb: 1 }}>
        <CalendarIcon />
        <Typography
          component="span"
          sx={(theme) => ({
            fontSize: "0.625rem",
            fontWeight: 500,
            color: theme.custom.text.muted,
          })}
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
            {user.followingCount}
          </Typography>
          <Typography
            component="span"
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "0.625rem",
              color: theme.custom.text.muted,
            })}
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
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "0.625rem",
              color: theme.custom.text.muted,
            })}
          >
            Seguidores
          </Typography>
        </Box>
      </Box>

      {isOwnProfile && isTabletOrMobile ? (
        <Box sx={{ mt: 1.2 }}>
          <PrimaryButton
            variant="outlined"
            onClick={onLogout}
            sx={{
              width: 162,
              height: 28,
            }}
          >
            Sair
          </PrimaryButton>
        </Box>
      ) : !isOwnProfile ? (
        <Box sx={{ mt: 1.2 }}>
          <PrimaryButton
            variant={isFollowing ? "outlined" : "contained"}
            onClick={() => onToggleFollow(user.id)}
          >
            {isFollowing ? "Seguindo" : "Seguir"}
          </PrimaryButton>
        </Box>
      ) : null}
    </Box>
  );
}
