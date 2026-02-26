import { useEffect, useMemo, useState } from "react";
import { getFeed } from "../services/feedService";
import type { FeedTweet, TabType } from "../types";
import { HomeTimeline } from "../components/HomeTimeline";
import { mapFeed } from "../mappers/feedMapper";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export function FeedPage() {
  const { token, user } = useSelector((state: RootState) => state.auth);

  const loggedUserId = user?.id;

  const [feed, setFeed] = useState<FeedTweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabType>("foryou");

  useEffect(() => {
    async function fetchFeed() {
      if (!token) return;

      try {
        setLoading(true);
        const data = await getFeed(token);
        setFeed(mapFeed(data));
      } catch (error) {
        console.error("Erro ao buscar feed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
  }, [token]);

  const processedFeed = useMemo(() => {
    if (tab === "foryou") return feed;
    if (!loggedUserId) return [];

    return [...feed]
      .filter((tweet) => tweet.user.id !== loggedUserId)
      .sort((a, b) => b.likesCount - a.likesCount);
  }, [feed, tab, loggedUserId]);

  const updateLikeRecursively = (
    tweets: FeedTweet[],
    tweetId: string,
  ): FeedTweet[] => {
    return tweets.map((tweet) => {
      if (tweet.id === tweetId) {
        const newIsLiked = !tweet.isLiked;

        return {
          ...tweet,
          isLiked: newIsLiked,
          likesCount: newIsLiked ? tweet.likesCount + 1 : tweet.likesCount - 1,
        };
      }

      if (tweet.replies.length > 0) {
        return {
          ...tweet,
          replies: updateLikeRecursively(tweet.replies, tweetId),
        };
      }

      return tweet;
    });
  };

  const handleLike = (tweetId: string) => {
    setFeed((prev) => updateLikeRecursively(prev, tweetId));
  };

  return (
    <>
      <main>
        <section>
          <HomeTimeline
            feed={processedFeed}
            loading={loading}
            tab={tab}
            setTab={setTab}
            onLike={handleLike}
          />
        </section>
      </main>
    </>
  );
}
