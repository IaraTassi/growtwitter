import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import type { ProfileTweetResponseDto } from "../types";
import { getProfileTweets } from "../services/profileService";

export function useProfileTweets(userId: string) {
  const token = useSelector((s: RootState) => s.auth.token);

  const [data, setData] = useState<ProfileTweetResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !userId) return;

    const safeToken = token;

    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await getProfileTweets(userId, safeToken);

        if (!isMounted) return;

        setData(res);
      } catch (error) {
        console.error("Erro ao carregar tweets do perfil:", error);
        if (!isMounted) return;

        setError("Erro ao carregar tweets");
        setData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [userId, token]);

  return { data, loading, error };
}
