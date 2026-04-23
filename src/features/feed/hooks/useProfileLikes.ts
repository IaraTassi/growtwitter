import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import type { ProfileLikedTweetResponseDto } from "../types";
import { getProfileLikes } from "../services/profileService";

export function useProfileLikes(userId: string) {
  const token = useSelector((s: RootState) => s.auth.token);

  const [data, setData] = useState<ProfileLikedTweetResponseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const safeToken = token;

    async function load() {
      const res = await getProfileLikes(userId, safeToken);

      setData(res);
      setLoading(false);
    }

    load();
  }, [userId, token]);

  return { data, loading };
}
