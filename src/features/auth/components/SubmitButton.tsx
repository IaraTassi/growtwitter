import { Button, CircularProgress } from "@mui/material";
import type { SubmitButtonProps } from "../types";

export function SubmitButton({
  label,
  loading = false,
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
    >
      {loading ? (
        <>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          Carregando...
        </>
      ) : (
        label
      )}
    </Button>
  );
}
