import { useEffect, useMemo, useState } from "react";
import { getFeed } from "../services/feedService";
import type { FeedTweet, FeedTweetApi, TabType } from "../types";

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
  const [tab, setTab] = useState<TabType>("foryou");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeed() {
      try {
        setLoading(true);

        const data = (await getFeed(token)) as FeedTweetApi[];

        const normalized: FeedTweet[] = data.map((tweet) => ({
          ...tweet,
          likesCount: tweet.likes?.length ?? 0,
          repliesCount: tweet.replies?.length ?? 0,
        }));

        setFeed(normalized);
      } catch (error) {
        console.error("Erro ao buscar feed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, [token]);

  const processedFeed = useMemo(() => {
    if (tab === "foryou") {
      return feed;
    }

    if (!loggedUserId) {
      return [];
    }

    return [...feed]
      .filter((tweet) => tweet.user.id !== loggedUserId)
      .sort((a, b) => Number(b.likesCount ?? 0) - Number(a.likesCount ?? 0));
  }, [feed, tab, loggedUserId]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Página Inicial</h2>

      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <button
          onClick={() => setTab("foryou")}
          style={{ fontWeight: tab === "foryou" ? "bold" : "normal" }}
        >
          For You
        </button>

        <button
          onClick={() => setTab("following")}
          style={{ fontWeight: tab === "following" ? "bold" : "normal" }}
        >
          Following
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : processedFeed.length === 0 ? (
        <p>Nenhum tweet encontrado</p>
      ) : (
        processedFeed.map((t) => (
          <div
            key={t.id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "12px 0",
            }}
          >
            <img
              src={t.user.imageUrl ?? ""}
              alt={t.user.name}
              width={40}
              height={40}
            />

            <div style={{ display: "flex", gap: 8 }}>
              <strong>{t.user.name}</strong>
              <span style={{ color: "#555" }}>@{t.user.userName}</span>
            </div>

            <p>{t.content}</p>

            <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
              <span>💬 {t.repliesCount ?? 0}</span>
              <span>❤️ {t.likesCount ?? 0}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
