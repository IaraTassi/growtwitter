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
import { ConfirmDialog } from "./ConfirmDialog";

export function TweetsTab({ userId }: TweetsTabProps) {
  const { data, loading, refetch } = useProfileTweets(userId);

  const [deletedTweetIds, setDeletedTweetIds] = useState<string[]>([]);

  const [deleteTweetId, setDeleteTweetId] = useState<string | null>(null);

  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token)!;
  const user = useSelector((state: RootState) => state.auth.user);

  const globalTweets = useSelector((state: RootState) => state.feed.tweets);

  const dispatch = useAppDispatch();
  const { handleDelete } = useDeleteTweet(token ?? "");

  const avatarSize = 37;

  const visibleTweets = data.filter(
    (tweet) => !deletedTweetIds.includes(tweet.id),
  );

  useEffect(() => {
    refetch();
  }, [globalTweets.length, refetch]);

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

    await refetch();

    handleCloseModal();
  };

  const handleDeleteTweet = (tweetId: string) => {
    setDeleteTweetId(tweetId);
  };

  const handleConfirmDelete = () => {
    if (!deleteTweetId) return;

    handleDelete(deleteTweetId, () => {
      dispatch(removeTweet(deleteTweetId));

      setDeletedTweetIds((prev) => [...prev, deleteTweetId]);

      setDeleteTweetId(null);
    });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteTweetId(null);
  };

  if (loading) {
    return (
      <Box>
        <Typography sx={{ px: 3, pt: 2 }}>Carregando tweets...</Typography>
      </Box>
    );
  }

  if (!visibleTweets.length) {
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
      {visibleTweets.map((tweet) => (
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

      <ConfirmDialog
        open={!!deleteTweetId}
        title="Excluir growtweet?"
        description="Essa ação não poderá ser desfeita."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteDialog}
      />
    </Box>
  );
}
