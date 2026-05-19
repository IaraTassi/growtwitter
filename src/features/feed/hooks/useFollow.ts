import { useState } from "react";
import { followUser, unfollowUser } from "../services/followService";
import { SessionExpiredError } from "../services/errors/SessionExpiredError";

export function useFollow(token: string) {
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const toggleFollow = async (
    userId: string,
    isFollowing: boolean,
    onSuccess: () => void,
  ) => {
    try {
      setLoadingIds((prev) => [...prev, userId]);

      if (isFollowing) {
        await unfollowUser(token, userId);
      } else {
        await followUser(token, userId);
      }

      onSuccess();
    } catch (error) {
      if (error instanceof SessionExpiredError) {
        return;
      }

      console.error("Erro ao atualizar follow:", error);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  return { toggleFollow, loadingIds };
}
