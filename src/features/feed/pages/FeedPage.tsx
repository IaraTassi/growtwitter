import { useEffect, useState } from "react";
import { getFeed } from "../services/feedService";
import type { FeedTweet } from "../types";
import { HomeTimeline } from "../components/HomeTimeline";
import { mapFeed } from "../mappers/feedMapper";

export function FeedPage() {
  const token = localStorage.getItem("token") || "";

  function getUserIdFromToken(token: string): string | null {
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.sub ?? payload.id ?? null;
    } catch {
      return null;
    }
  }

  const loggedUserId = getUserIdFromToken(token);

  const [feed, setFeed] = useState<FeedTweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        setLoading(true);
        const data = await getFeed(token);
        const normalized = mapFeed(data);
        setFeed(normalized);
      } catch (error) {
        console.error("Erro ao buscar feed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, [token]);

  return (
    <>
      <main>
        <section>
          <HomeTimeline
            feed={feed}
            loggedUserId={loggedUserId}
            loading={loading}
          />
        </section>
      </main>
    </>
  );
}
