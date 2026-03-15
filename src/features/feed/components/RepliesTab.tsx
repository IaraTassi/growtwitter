import { Box, Typography } from "@mui/material";

export function RepliesTab() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: "1.375rem",
        }}
      >
        Postou, recebeu resposta
      </Typography>
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
  );
}
