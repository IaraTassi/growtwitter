import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { ReplyThread } from "./ReplyThread";
import { useRepliesThreads } from "../hooks/useTweets";
import { selectFeedTweets } from "../store/feedSelectors";
import type { RootState } from "../../../store/store";

export function RepliesTab() {
  const feed = useSelector(selectFeedTweets);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const threadsMap = useRepliesThreads(feed, currentUser?.id ?? "");

  const threadsArray = Array.from(threadsMap.values());

  if (!currentUser || threadsArray.length === 0) {
    return (
      <Box className="replies-tab" sx={{ p: 4 }}>
        <Box component="header">
          <Typography sx={{ fontWeight: 800, fontSize: "1.375rem" }}>
            Postou, recebeu resposta
          </Typography>
        </Box>
        <Box className="main">
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "0.625rem",
              color: "text.disabled",
              mt: 1,
            }}
          >
            Se ainda não aparece nenhuma resposta aqui, talvez você precise
            interagir mais com seus Growtweets para receber respostas.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {threadsArray.map(({ root, replies }) => (
        <ReplyThread
          key={root.id}
          root={root}
          replies={replies}
          currentUserId={currentUser.id}
        />
      ))}
    </Box>
  );
}
