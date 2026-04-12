import { useSelector } from "react-redux";
import { ExplorerTimeline } from "../components/ExplorerTimeline";
import type { RootState } from "../../../store/store";
import { useExplorer } from "../hooks/useExplorer";

export function ExplorerPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  const explorer = useExplorer({
    token: token ?? "",
    currentUserId: currentUserId ?? "",
  });

  if (!token || !currentUserId) return null;

  return (
    <ExplorerTimeline
      users={explorer.users}
      remaining={explorer.remaining}
      loading={explorer.loading}
      onToggleFollow={explorer.handleToggleFollow}
      onLoadMore={explorer.loadMore}
    />
  );
}
