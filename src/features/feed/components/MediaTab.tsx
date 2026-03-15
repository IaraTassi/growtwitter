import { Box, Typography } from "@mui/material";

export function MediaTab() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: "1.375rem",
        }}
      >
        Luzes, câmera...anexos!
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "0.625rem",
          color: "text.disabled",
          mt: 1,
        }}
      >
        Quando você enviar Tweets com fotos ou vídeos, eles serão exibidos aqui.
      </Typography>
    </Box>
  );
}
