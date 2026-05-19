import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useCallback, useEffect, useState } from "react";
import type { ProfileTweetResponseDto } from "../types";
import { getProfileTweets } from "../services/profileService";
import { SessionExpiredError } from "../services/errors/SessionExpiredError";

export function useProfileTweets(userId: string) {
  const token = useSelector((s: RootState) => s.auth.token);

  const [data, setData] = useState<ProfileTweetResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (isMounted: () => boolean = () => true) => {
      if (!token || !userId) {
        if (isMounted()) {
          setLoading(false);
          setData([]);
        }

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await getProfileTweets(userId, token);

        if (!isMounted()) return;

        setData(res);
      } catch (error) {
        if (!isMounted()) return;

        if (error instanceof SessionExpiredError) {
          return;
        }

        console.error("Erro ao carregar tweets do perfil:", error);

        setError("Erro ao carregar tweets");
        setData([]);
      } finally {
        if (isMounted()) {
          setLoading(false);
        }
      }
    },
    [userId, token],
  );

  useEffect(() => {
    let isMounted = true;

    load(() => isMounted);

    return () => {
      isMounted = false;
    };
  }, [load]);

  return {
    data,
    loading,
    error,
    refetch: load,
  };
}
