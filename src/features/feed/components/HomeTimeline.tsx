import { useMemo, useState } from "react";
import type { FeedContentProps, TabType } from "../types";

export function HomeTimeline({
  feed,
  loggedUserId,
  loading,
}: FeedContentProps) {
  const [tab, setTab] = useState<TabType>("foryou");

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
          style={{
            fontWeight: tab === "foryou" ? "bold" : "normal",
          }}
        >
          Para você
        </button>

        <button
          onClick={() => setTab("following")}
          style={{
            fontWeight: tab === "following" ? "bold" : "normal",
          }}
        >
          Seguindo
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

            <div
              style={{
                display: "flex",
                gap: 16,
                fontSize: 14,
              }}
            >
              <span>💬 {t.repliesCount ?? 0}</span>
              <span>❤️ {t.likesCount ?? 0}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
