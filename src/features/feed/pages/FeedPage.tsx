import { useEffect, useState } from "react";
import { getFeed } from "../services/feedService";
import type { FeedTweet } from "../types";

export function FeedPage() {
  const [tweets, setTweets] = useState<FeedTweet[]>([]);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    async function fetchFeed() {
      const data = await getFeed(token);

      setTweets(data);
    }

    fetchFeed();
  }, [token]);

  return (
    <div>
      <h2>Página Inicial</h2>
      <div>
        {tweets.length === 0 ? (
          <p>Nenhum tweet encontrado</p>
        ) : (
          tweets.map((t) => (
            <div key={t.id}>
              <strong>{t.user.name}</strong>: {t.content}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
