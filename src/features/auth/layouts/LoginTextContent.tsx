import { Box, Typography } from "@mui/material";

export function LoginTextContent() {
  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        bgcolor: "secondary.main",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 3,
        py: 2,
        gap: 1.5,
        overflow: "hidden",
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{ fontSize: "2rem", fontWeight: 700}}
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
        O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo e a disseminação de ideias.
      </Typography>
    </Box>
  );
}
