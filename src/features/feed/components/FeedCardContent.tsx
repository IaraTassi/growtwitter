import { Box, Typography } from "@mui/material";
import type { FeedCardContentProps } from "../types";
import { timeAgo } from "../utils/timeAgo";
import { VerifyIcon } from "../utils/icons/VerifyIcon";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { ReplyIcon } from "../utils/icons/ReplyIcon";
import { LikeIcon } from "../utils/icons/LikeIcon";
import { GraphIcon } from "../utils/icons/GraphIcon";

export function FeedCardContent({
  tweet,
  onLike,
  showReplyLabel,
}: FeedCardContentProps) {
  const variant = tweet.user.imageUrl ? "primary" : "secondary";
  const handleLikeClick = () => {
    onLike(tweet.id);
  };

  return (
    <Box
      component="article"
      display="grid"
      gridTemplateColumns="56px 1fr"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        padding: "0.75rem ",
      }}
    >
      <Box>
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          alignContent="flex-start"
        >
          <CustomAvatar imageUrl={tweet.user.imageUrl} />
        </Box>
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
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: "0.75rem",
                fontWeight: "800",
              }}
            >
              {tweet.user.name}
            </Typography>

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
                color="text.disabled"
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                • {timeAgo(tweet.createdAt)}
              </Typography>
            </Box>
            {showReplyLabel && tweet.replyToUser && (
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  marginTop: 0.3,
                }}
              >
                Em resposta a @{tweet.replyToUser.userName}
              </Typography>
            )}
          </Box>
        </Box>
        <Box component="main" color="text.secondary">
          <Typography sx={{ fontSize: "0.75rem", fontWeight: 400 }}>
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
          <Box display="flex" alignItems="center" gap={1}>
            <ReplyIcon />
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
