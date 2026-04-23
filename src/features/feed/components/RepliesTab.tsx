import { Box, Typography } from "@mui/material";
import { ReplyThread } from "./ReplyThread";
import type { RepliesTabProps } from "../types";
import { useProfileReplies } from "../hooks/useProfileReplies";

export function RepliesTab({ userId }: RepliesTabProps) {
  const { data, loading } = useProfileReplies(userId);

  if (loading) {
    return (
      <Box>
        <Typography sx={{ px: 3, pt: 2 }}>Carregando respostas...</Typography>
      </Box>
    );
  }

  if (!data.length) {
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
      {data.map((node) => (
        <ReplyThread
          key={node.id}
          node={node}
        />
      ))}
    </Box>
  );
}
