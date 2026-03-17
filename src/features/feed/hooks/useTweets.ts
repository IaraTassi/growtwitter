import { deleteTweet } from "../services/tweetService";

export function useDeleteTweet(token: string) {
  const handleDelete = async (tweetId: string, onSuccess?: () => void) => {
    try {
      await deleteTweet(token, tweetId);
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao deletar tweet", error);
    }
  };

  return { handleDelete };
}
