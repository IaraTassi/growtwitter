import { Box, Button, CircularProgress } from "@mui/material";
import type { SubmitButtonProps } from "../types";

export function SubmitButton({
  label,
  loading = false,
  loadingLabel,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      size="large"
      disabled={loading || disabled}
      aria-busy={loading || undefined}
      aria-live="polite"
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CircularProgress size={20} sx={{ mr: 1, color: "common.white" }} />
          {loadingLabel ?? label}
        </Box>
      ) : (
        label
      )}
    </Button>
  );
}
