import { Box, Typography } from "@mui/material";

export function LoginTextContent() {
  return (
    <Box
      component="section"
      sx={(theme) => ({
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: {
          xs: "center",
          md: "flex-start",
        },

        textAlign: {
          xs: "center",
          md: "left",
        },

        px: {
          xs: 2,
          md: 3,
        },

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
        sx={{
          fontSize: {
            xs: "1.5rem",
            md: "2rem",
          },
          fontWeight: 700,
        }}
      >
        Growtwitter
      </Typography>

      <Typography
        component="p"
        variant="body2"
        sx={{
          fontSize: {
            xs: "0.75rem",
            md: "0.875rem",
          },
        }}
      >
        Trabalho final do bloco intermediário.
      </Typography>

      <Typography
        component="p"
        variant="body1"
        sx={{
          maxWidth: {
            xs: "100%",
            md: 420,
          },

          fontSize: {
            xs: "0.875rem",
            md: "1rem",
          },

          lineHeight: 1.5,
        }}
      >
        O Growtwitter é a plataforma definitiva para todos os apaixonados por
        redes sociais que buscam uma experiência familiar e poderosa, semelhante
        ao Twitter, mas com um toque único. Seja parte desta comunidade que
        valoriza a liberdade de expressão, a conexão com pessoas de todo o mundo
        e a disseminação de ideias.
      </Typography>
    </Box>
  );
}
