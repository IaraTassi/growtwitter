import { Typography } from "@mui/material";
import type { AuthErrorProps } from "../types";

export function AuthError({ error }: AuthErrorProps) {
  if (!error) return null;

  let message: string;

  if (typeof error === "string") {
    message = error;
  } else if ("message" in error) {
    message = error.message;
  } else {
    message = "Ocorreu um erro desconhecido";
  }

  return (
    <Typography
      component="p"
      variant="body2"
      color="error"
      role="alert"
      data-testid="auth-error"
    >
      {message}
    </Typography>
  );
}
