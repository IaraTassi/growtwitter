import { Box, Typography } from "@mui/material";
import type { TweetsTabProps } from "../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { useDeleteTweet } from "../hooks/useTweets";
import { createReplyThunk } from "../store/feedThunks";
import { ComposerModal } from "./ComposerModal";
import { removeTweet } from "../store/feedSlice";
import { TweetItem } from "./TweetItem";
import { useProfileTweets } from "../hooks/useProfileTweets";

export function TweetsTab({ userId }: TweetsTabProps) {
  const { data, loading } = useProfileTweets(userId);
  const [tweets, setTweets] = useState(data);

  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token)!;
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const { handleDelete } = useDeleteTweet(token ?? "");

  const avatarSize = 37;

  useEffect(() => {
    setTweets(data);
  }, [data]);

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
    handleDelete(tweetId, () => {
      dispatch(removeTweet(tweetId));

      setTweets((prev) => prev.filter((tweet) => tweet.id !== tweetId));
    });
  };

  if (loading) {
    return (
      <Box>
        <Typography sx={{ px: 3, pt: 2 }}>Carregando tweets...</Typography>
      </Box>
    );
  }

  if (!tweets.length) {
    return (
      <Box className="tweets-tab" sx={{ p: 4 }}>
        <Box className="header">
          <Typography sx={{ fontWeight: 800, fontSize: "1.375rem" }}>
            Ainda não fez nenhum growtweet?
          </Typography>
        </Box>
        <Box className="main">
          <Typography
            sx={(theme) => ({
              fontWeight: 500,
              fontSize: "0.625rem",
              mt: 1,
              color: theme.custom.text.muted,
            })}
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
      {tweets.map((tweet) => (
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
        userImageUrl={user?.imageUrl ?? ""}
        onSubmit={handleSubmitReply}
        submitLabel="Responder"
      />
    </Box>
  );
}
