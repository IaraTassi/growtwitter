import { Box, Typography } from "@mui/material";
import { ReplyThread } from "./ReplyThread";
import { mapThreads } from "../utils/tweetUtils";
import type { RepliesTabProps } from "../types";

export function RepliesTab({ userId, tweets }: RepliesTabProps) {
  const threadsMap = mapThreads(tweets, userId);
  const threads = Array.from(threadsMap.values());

  if (threads.length === 0) {
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
      {threads.map(({ root, replies }) => (
        <ReplyThread
          key={root.id}
          root={root}
          replies={replies}
          currentUserId={userId}
        />
      ))}
    </Box>
  );
}
