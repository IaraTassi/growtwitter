import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useCallback, useEffect, useState } from "react";
import type { ProfileTweetResponseDto } from "../types";
import { getProfileTweets } from "../services/profileService";

export function useProfileTweets(userId: string) {
  const token = useSelector((s: RootState) => s.auth.token);

  const [data, setData] = useState<ProfileTweetResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token || !userId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await getProfileTweets(userId, token);

      setData(res);
    } catch (error) {
      console.error("Erro ao carregar tweets do perfil:", error);

      setError("Erro ao carregar tweets");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    loading,
    error,
    refetch: load,
  };
}
