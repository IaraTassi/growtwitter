import { useEffect, useState } from "react";
import { HomeTimeline } from "../components/HomeTimeline";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { useTimeline } from "../hooks/useTimeline";
import { useAppDispatch } from "../../../hooks/redux";
import {
  selectFeedError,
  selectFeedLoading,
  selectFeedTweets,
} from "../store/feedSelectors";
import type { TabType } from "../types";
import {
  createReplyThunk,
  fetchFeed,
  toggleLikeThunk,
} from "../store/feedThunks";

export function FeedPage() {
  const dispatch = useAppDispatch();

  const { token, user } = useSelector((state: RootState) => state.auth);

  const tweets = useSelector(selectFeedTweets);
  const loading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  const [tab, setTab] = useState<TabType>("foryou");

  useEffect(() => {
    if (token) {
      dispatch(fetchFeed());
    }
  }, [dispatch, token]);

  const timelineItems = useTimeline(tweets, tab, user?.id);

  const handleLike = (tweetId: string) => {
    dispatch(toggleLikeThunk(tweetId));
  };

  const handleReply = (parentId: string, content: string) => {
    if (!token) return;

    dispatch(
      createReplyThunk({
        parentId,
        content,
      }),
    );
  };

  return (
    <main>
      <section>
        {error && <div className="feed-error">{error}</div>}
        <HomeTimeline
          items={timelineItems}
          loading={loading}
          tab={tab}
          setTab={setTab}
          onLike={handleLike}
          onReply={handleReply}
          userImageUrl={user?.imageUrl}
        />
      </section>
    </main>
  );
}
