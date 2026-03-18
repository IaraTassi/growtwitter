import { useCallback, useMemo } from "react";
import { deleteTweet } from "../services/tweetService";
import type { FeedTweet } from "../types";
import { mapThreads } from "../utils/tweetUtils";

export function useDeleteTweet(token: string) {
  const handleDelete = useCallback(
    async (tweetId: string, onSuccess?: () => void) => {
      try {
        await deleteTweet(token, tweetId);
        onSuccess?.();
      } catch (error) {
        console.error("Erro ao deletar tweet", error);
      }
    },
    [token],
  );

  return { handleDelete };
}

export function useRepliesThreads(feed: FeedTweet[], currentUserId: string) {
  return useMemo(() => mapThreads(feed, currentUserId), [feed, currentUserId]);
}
