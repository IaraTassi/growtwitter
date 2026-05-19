import { ConfirmDialog } from "../features/feed/components/ConfirmDialog";
import type { SessionExpiredDialogProps } from "../type";

export function SessionExpiredDialog({
  open,
  onClose,
}: SessionExpiredDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      title="Sessão expirada"
      description="Sua sessão expirou. Faça login novamente para continuar."
      confirmLabel="OK"
      hideCancelButton
      onConfirm={onClose}
      onClose={onClose}
    />
  );
}
