import type { IdentifierToggleProps } from "../types";

export function IdentifierToggle({
  identifierMode,
  loading = false,
  onToggle,
}: IdentifierToggleProps) {
  return (
    <button
      type="button"
      className="toggle-identifier"
      disabled={loading}
      onClick={onToggle}
    >
      Usar {identifierMode === "email" ? "nome de usuário" : "email"}
    </button>
  );
}
