import { Box, Typography } from "@mui/material";
import type { FeedCardContentProps } from "../types";
import { timeAgo } from "../utils/timeAgo";
import { VerifyIcon } from "../utils/icons/VerifyIcon";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { ReplyIcon } from "../utils/icons/ReplyIcon";
import { LikeIcon } from "../utils/icons/LikeIcon";
import { GraphIcon } from "../utils/icons/GraphIcon";
import { ProfileLink } from "./ProfileLink";

export function FeedCardContent({
  tweet,
  parentTweet,
  onLike,
  showReplyLabel,
  showThreadLine,
  isLastInThread,
  onReplyClick,
}: FeedCardContentProps) {
  const isLast = isLastInThread ?? false;
  const variant = tweet.user.imageUrl ? "primary" : "secondary";
  const isParentVerified = !!parentTweet?.user.imageUrl;

  const handleLikeClick = () => {
    onLike(tweet.id);
  };

  const handleReplyClick = () => {
    onReplyClick?.(tweet.id);
  };

  return (
    <Box
      component="article"
      display="grid"
      gridTemplateColumns="56px 1fr"
      sx={{
        padding: "0.75rem",
      }}
    >
      <Box
        sx={{
          width: 56,
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <ProfileLink userId={tweet.user.id}>
          <CustomAvatar imageUrl={tweet.user.imageUrl} />
        </ProfileLink>

        {showThreadLine && !isLast && (
          <Box
            sx={(theme) => ({
              position: "absolute",
              top: 56,
              bottom: 0,
              width: 2,
              bgcolor: theme.palette.divider,
            })}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component="header"
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <ProfileLink userId={tweet.user.id}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "800",
                }}
              >
                {tweet.user.name}
              </Typography>
            </ProfileLink>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.25,
              }}
            >
              <VerifyIcon variant={variant} sx={{ width: 12, height: 12 }} />

              <Typography
                variant="caption"
                sx={(theme) => ({
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: theme.custom.text.muted,
                })}
              >
                @{tweet.user.userName} • {timeAgo(tweet.createdAt)}
              </Typography>
            </Box>
          </Box>
          {showReplyLabel && parentTweet && isParentVerified && (
            <Typography
              variant="caption"
              sx={(theme) => ({
                fontSize: "0.75rem",
                fontWeight: 500,
                marginTop: 0.3,
                color: theme.custom.text.muted,
              })}
            >
              Em resposta a{" "}
              <Box
                component="span"
                sx={(theme) => ({
                  color: theme.custom.text.link,
                })}
              >
                @{parentTweet.user.userName}
              </Box>
            </Typography>
          )}
        </Box>
        <Box component="main">
          <Typography
            sx={(theme) => ({
              fontSize: "0.75rem",
              fontWeight: 400,
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
            marginTop: "0.3rem",
            gap: 4,
            fontSize: "0.75rem",
            fontWeight: 500,
            color: theme.custom.text.muted,
          })}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <ReplyIcon onClick={handleReplyClick} />
            <Typography variant="caption" sx={{ paddingTop: "0.2rem" }}>
              {tweet.repliesCount}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <LikeIcon isLiked={tweet.isLiked} onClick={handleLikeClick} />
            <Typography
              variant="caption"
              sx={{
                paddingTop: "0.2rem",
              }}
            >
              {tweet.likesCount}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <GraphIcon />
            <Typography variant="caption" sx={{ paddingTop: "0.4rem" }}>
              1.111 mil
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
