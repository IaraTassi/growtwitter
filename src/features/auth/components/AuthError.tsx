import { Typography } from "@mui/material";
import type { AuthErrorProps } from "../types";

export function AuthError({ error }: AuthErrorProps) {
  if (!error) return null;
  const message = typeof error === "string" ? error : error.message;

  return (
    <Typography
      component="p"
      variant="body2"
      color="error"
      role="alert"
      sx={{ mt: 1 }}
      data-testid="auth-error"
    >
      {message}
    </Typography>
  );
}
