import { Box, Typography } from "@mui/material";

export function LikesTab() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: "1.375rem",
        }}
      >
        Você ainda não tem nenhuma curtida
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "0.625rem",
          color: "text.disabled",
          mt: 1,
        }}
      >
        Toque no coração em qualquer Tweet para demonstrar afeto. Quando você
        realizar essa ação, o resultado aparece aqui.
      </Typography>
    </Box>
  );
}
