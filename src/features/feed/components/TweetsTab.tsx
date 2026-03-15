import { Box, Typography } from "@mui/material";

export function TweetsTab() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: "1.375rem",
        }}
      >
        Ainda não fez nenhum growtweet?
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "0.625rem",
          color: "text.disabled",
          mt: 1,
        }}
      >
        Não esqueça que para que as pessoas possam interagir com as suas
        publicações, você precisa... publicar.
      </Typography>
    </Box>
  );
}
