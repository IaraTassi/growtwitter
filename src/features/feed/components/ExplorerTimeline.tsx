import { Box, Typography } from "@mui/material";
import type { ExplorerTimelineProps } from "../types";
import { SuggestedUsersList } from "./SuggestedUsersList";

export function ExplorerTimeline({
  users,
  remaining,
  loading,
  onToggleFollow,
  onLoadMore,
}: ExplorerTimelineProps) {
  if (loading) {
    return (
      <Typography sx={{ px: 3, pt: 2 }}>Carregando explorar...</Typography>
    );
  }

  return (
    <Box component="section">
      <Box component="header" sx={{ py: 2, px: 3 }}>
        <Typography component="h2">Explorar usuários</Typography>
      </Box>

      <SuggestedUsersList users={users} onToggleFollow={onToggleFollow} />

      {remaining > 0 && (
        <Box sx={{ px: 3, pt: 2, cursor: "pointer" }} onClick={onLoadMore}>
          Mostrar mais ({remaining})
        </Box>
      )}
    </Box>
  );
}
