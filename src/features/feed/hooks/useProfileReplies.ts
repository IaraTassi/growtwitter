import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import type { ProfileReplyResponseDto } from "../types";
import { getProfileReplies } from "../services/profileService";

export function useProfileReplies(userId: string) {
  const token = useSelector((s: RootState) => s.auth.token);

  const [data, setData] = useState<ProfileReplyResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !userId) return;

    const safeToken = token;

    let isMounted = true;

    async function load() {
      try {
        setLoading(true);

        const res = await getProfileReplies(userId, safeToken);

        if (!isMounted) return;

        setData(res);
      } catch (err) {
        console.error("Erro ao buscar replies:", err);

        if (isMounted) {
          setData([]);
        }
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
