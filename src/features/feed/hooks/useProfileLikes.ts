import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import type { ProfileLikedTweetResponseDto } from "../types";
import { getProfileLikes } from "../services/profileService";
import { SessionExpiredError } from "../services/errors/SessionExpiredError";

export function useProfileLikes(userId: string) {
  const token = useSelector((s: RootState) => s.auth.token);

  const [data, setData] = useState<ProfileLikedTweetResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !userId) return;

    let isMounted = true;

    const safeToken = token;

    async function load() {
      try {
        setLoading(true);

        const res = await getProfileLikes(userId, safeToken);

        if (!isMounted) return;

        setData(res);
      } catch (error) {
        if (!isMounted) return;

        if (error instanceof SessionExpiredError) {
          return;
        }

        console.error("Erro ao carregar curtidas:", error);

        setData([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [userId, token]);

  return { data, loading };
}
