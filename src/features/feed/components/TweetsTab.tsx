import { Box, Typography } from "@mui/material";
import type { TweetTabProps } from "../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useDeleteTweet } from "../hooks/useTweets";
import { createReplyThunk } from "../store/feedThunks";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { CalendarIcon } from "../utils/icons/CalendarIcon";
import { timeAgo } from "../utils/timeAgo";
import { ReplyIcon } from "../utils/icons/ReplyIcon";
import { COLORS } from "../../../theme/colors";
import { removeTweet } from "../store/feedSlice";
import { TrashIcon } from "../utils/icons/TrashIcon";
import { ComposerModal } from "./ComposerModal";

export function TweetsTab({ user }: TweetTabProps) {
  const allTweets = useSelector((state: RootState) => state.feed.tweets ?? []);

  const userTweets = allTweets.filter(
    (t) => t.user.id === user.id && !t.parentId,
  );

  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token)!;
  const dispatch = useAppDispatch();
  const { handleDelete } = useDeleteTweet(token);

  const avatarSize = 37;

  const handleOpenReply = (tweetId: string) => {
    setReplyParentId(tweetId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setReplyParentId(null);
  };

  const handleSubmitReply = async (content: string) => {
    if (!replyParentId) return;

    await dispatch(
      createReplyThunk({
        parentId: replyParentId,
        content,
      }),
    );

    handleCloseModal();
  };

  if (!userTweets.length) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.375rem",
          }}
        >
          Ainda não fez nenhum growtweet?
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "0.625rem",
            color: "text.disabled",
            mt: 1,
          }}
        >
          Não esqueça que para que as pessoas possam interagir com as suas
          publicações, você precisa... publicar.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {userTweets.map((tweet) => (
        <Box
          key={tweet.id}
          className="profile-tweet"
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
                  onClick={() => handleOpenReply(tweet.id)}
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
                  "&:hover svg": { fill: COLORS.error },
                }}
                onClick={() =>
                  handleDelete(tweet.id, () => dispatch(removeTweet(tweet.id)))
                }
              >
                <TrashIcon />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      <ComposerModal
        open={modalOpen}
        onClose={handleCloseModal}
        userImageUrl={user.imageUrl}
        onSubmit={handleSubmitReply}
        submitLabel="Responder"
      />
    </Box>
  );
}
