import type { AuthErrorProps } from "../types";

export function AuthError({ error }: AuthErrorProps) {
  if (!error) return null;

  const message = typeof error === "string" ? error : error.message;

  return <p className="error">{message}</p>;
}
