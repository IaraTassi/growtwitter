import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import type { ProfileUser } from "../types";
import { getUserById } from "../services/userService";
import { Typography } from "@mui/material";
import { ProfileTimeline } from "../components/ProfileTimeline";
import { SessionExpiredError } from "../services/errors/SessionExpiredError";

export function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const token = useSelector((state: RootState) => state.auth.token);

  const [user, setUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !token) return;

    const safeId = id;
    const safeToken = token;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const userRes = await getUserById(safeId, safeToken);
        setUser(userRes);
      } catch (error) {
        if (error instanceof SessionExpiredError) {
          return;
        }

        console.error(error);

        setError("Erro ao carregar perfil");

        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, token]);

  if (loading)
    return <Typography sx={{ px: 3, pt: 2 }}>Carregando...</Typography>;
  if (error || !user)
    return <Typography sx={{ px: 3, pt: 2 }}>Perfil não encontrado</Typography>;

  return <ProfileTimeline key={user.id} user={user} />;
}
