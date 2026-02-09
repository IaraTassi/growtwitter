import type { SubmitButtonProps } from "../types";

export function SubmitButton({
  label,
  loading = false,
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button type="submit" disabled={loading || disabled} aria-busy={loading}>
      {loading ? "Carregando..." : label}
    </button>
  );
}
