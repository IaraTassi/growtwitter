import { Box, Typography } from "@mui/material";
import type { TweetTabProps } from "../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useDeleteTweet } from "../hooks/useTweets";
import { createReplyThunk } from "../store/feedThunks";
import { ComposerModal } from "./ComposerModal";
import { removeTweet } from "../store/feedSlice";
import { TweetItem } from "./TweetItem";

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

  const handleDeleteTweet = (tweetId: string) => {
    handleDelete(tweetId, () => dispatch(removeTweet(tweetId)));
  };

  if (!userTweets.length) {
    return (
      <Box className="tweets-tab" sx={{ p: 4 }}>
        <Box className="header">
          <Typography sx={{ fontWeight: 800, fontSize: "1.375rem" }}>
            Ainda não fez nenhum growtweet?
          </Typography>
        </Box>
        <Box className="main">
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
      </Box>
    );
  }

  return (
    <Box>
      {userTweets.map((tweet) => (
        <TweetItem
          key={tweet.id}
          tweet={tweet}
          avatarSize={avatarSize}
          onReply={handleOpenReply}
          onDelete={handleDeleteTweet}
        />
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
