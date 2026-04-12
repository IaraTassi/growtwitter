import { useCallback } from "react";
import { deleteTweet } from "../services/tweetService";

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
