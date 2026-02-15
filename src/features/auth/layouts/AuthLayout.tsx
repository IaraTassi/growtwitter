import { Box, Paper } from "@mui/material";
import type { AuthLayoutProps } from "../types";

export function AuthLayout({ left, right, reverse = false }: AuthLayoutProps) {
  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 1150,
        height: { xs: "auto", sm: 300 },
        display: "flex",
        flexDirection: { xs: "column", sm: reverse ? "row-reverse" : "row" },
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {left}
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {right}
      </Box>
    </Paper>
  );
}
