import { Box, Typography } from "@mui/material";
import type { TweetItemProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { CalendarIcon } from "../utils/icons/CalendarIcon";
import { timeAgo } from "../utils/timeAgo";
import { ReplyIcon } from "../utils/icons/ReplyIcon";
import { TrashIcon } from "../utils/icons/TrashIcon";
import { ProfileLink } from "./ProfileLink";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

export function TweetItem({
  tweet,
  avatarSize,
  onReply,
  onDelete,
}: TweetItemProps) {
  const loggedUserId = useSelector((state: RootState) => state.auth.user?.id);

  const isOwner = loggedUserId === tweet.user.id;

  return (
    <Box
      className="profile-tweets"
      sx={(theme) => ({
        display: "flex",
        gap: 2,
        px: 3,
        py: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: theme.custom.hover.item,
          "& .delete-icon": { opacity: 1 },
        },
      })}
    >
      <ProfileLink userId={tweet.user.id}>
        <CustomAvatar
          imageUrl={tweet.user.imageUrl}
          width={avatarSize}
          height={avatarSize}
        />
      </ProfileLink>

      <Box sx={{ flex: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <ProfileLink userId={tweet.user.id}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 800 }}>
              {tweet.user.name}
            </Typography>
          </ProfileLink>
        </Box>

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
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.3rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: theme.custom.text.muted,
          })}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarIcon />
              <Typography variant="caption">
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
                {tweet.repliesCount}
              </Typography>
            </Box>
          </Box>

          {isOwner && (
            <Box
              className="delete-icon"
              sx={(theme) => ({
                opacity: 0,
                transition: "opacity 0.2s",
                cursor: "pointer",
                "&:hover svg": { color: theme.custom.icon.danger },
              })}
              onClick={() => onDelete(tweet.id)}
            >
              <TrashIcon />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
