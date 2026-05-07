import { Box, Typography } from "@mui/material";

export function RegisterTextContent() {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 3,
        py: 2,
        gap: 1.5,
        overflow: "hidden",
        bgcolor: theme.custom.auth.accent,
        color: theme.custom.auth.text,
      })}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{ fontSize: "2rem", fontWeight: 700 }}
      >
        Growtwitter
      </Typography>

      <Typography component="p" variant="body2">
        Trabalho final do bloco intermediário.
      </Typography>

      <Typography
        component="p"
        variant="body1"
        sx={{
          fontSize: { lineHeight: 1.5 },
        }}
      >
        Crie sua conta e faça parte do Growtwitter, uma rede social pensada para
        quem valoriza conexão, troca de ideias e liberdade de expressão. Aqui
        você pode compartilhar opiniões, acompanhar pessoas do mundo todo e
        participar de conversas que realmente importam.
      </Typography>
    </Box>
  );
}
