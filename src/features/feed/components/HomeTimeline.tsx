import { useMemo, useState } from "react";
import type { FeedContentProps, TabType } from "../types";
import { FeedTabs } from "./FeedTabs";

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
    <section
      aria-labelledby="home-timeline-heading"
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <header>
        <h2 id="home-timeline-heading">Página Inicial</h2>
        <FeedTabs tab={tab} setTab={setTab} />
      </header>

      {loading ? (
        <p>Carregando...</p>
      ) : processedFeed.length === 0 ? (
        <p>Nenhum tweet encontrado</p>
      ) : (
        <section aria-label="Lista de tweets">
          {processedFeed.map((tweet) => (
            <article
              key={tweet.id}
              style={{
                borderBottom: "1px solid #ccc",
                padding: "12px 0",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <img
                src={tweet.user.imageUrl ?? ""}
                alt={`Foto de ${tweet.user.name}`}
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <strong>{tweet.user.name}</strong>
                <span style={{ color: "#555" }}>@{tweet.user.userName}</span>
              </div>

              <p>{tweet.content}</p>

              <footer style={{ display: "flex", gap: 16, fontSize: 14 }}>
                <span>💬 {tweet.repliesCount ?? 0}</span>
                <span>❤️ {tweet.likesCount ?? 0}</span>
              </footer>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}
