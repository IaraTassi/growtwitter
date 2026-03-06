import { Button, CircularProgress } from "@mui/material";
import type { PrimaryButtonProps } from "../types";

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
}: PrimaryButtonProps) {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        textTransform: "none",
        borderRadius: "1rem",
        fontSize: "0.75rem",
        fontWeight: 700,
        minWidth: 70,
      }}
    >
      {loading ? <CircularProgress size={18} /> : children}
    </Button>
  );
}
