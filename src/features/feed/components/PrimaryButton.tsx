import { Button, CircularProgress } from "@mui/material";
import type { PrimaryButtonProps } from "../types";

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  variant = "contained",
  fullWidth = false,
  sx,
}: PrimaryButtonProps) {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      sx={{
        textTransform: "none",
        borderRadius: "1rem",
        fontSize: "0.75rem",
        fontWeight: 700,
        minWidth: 70,
        mt: 1,
        ...sx,
      }}
    >
      {loading ? <CircularProgress size={18} /> : children}
    </Button>
  );
}
