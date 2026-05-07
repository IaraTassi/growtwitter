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
      sx={(theme) => ({
        textTransform: "none",
        borderRadius: "1rem",
        fontSize: "0.75rem",
        fontWeight: 700,
        minWidth: 70,

        ...(variant === "contained" && {
          backgroundColor: theme.custom.button.primary.default,
          color: theme.palette.common.white,

          "&:hover": {
            backgroundColor: theme.custom.button.primary.hover,
          },

          "&.Mui-disabled": {
            backgroundColor: theme.custom.button.primary.disabled,
          },
        }),

        ...(variant === "outlined" && {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,

          "&:hover": {
            borderColor: theme.palette.primary.light,
            backgroundColor: theme.custom.hover.item,
          },
        }),

        ...sx,
      })}
    >
      {loading ? <CircularProgress size={18} /> : children}
    </Button>
  );
}
