import { Box, Typography } from "@mui/material";

export function MediaTab() {
  return (
    <Box data-cy="tab-media" sx={{ p: 4 }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: "1.375rem",
        }}
      >
        Luzes, câmera...anexos!
      </Typography>
      <Typography
        sx={(theme) => ({
          fontWeight: 500,
          fontSize: "0.625rem",
          mt: 1,
          color: theme.custom.text.muted,
        })}
      >
        Quando você enviar Tweets com fotos ou vídeos, eles serão exibidos aqui.
      </Typography>
    </Box>
  );
}
