import { Box, Typography } from "@mui/material";
import { SuggestedUsersContainer } from "./SuggestedUsersContainer";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export function ExplorerTimeline() {
  const token = useSelector((state: RootState) => state.auth.token);
  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  return (
    <Box component="section" aria-labelledby="explorer-timeline-heading">
      <Box component="header" sx={{ py: 2, px: 3 }}>
        <Typography component="h2" id="explorer-timeline-heading">
          Explorar usuários
        </Typography>
      </Box>

      <SuggestedUsersContainer token={token!} currentUserId={currentUserId!} />
    </Box>
  );
}
