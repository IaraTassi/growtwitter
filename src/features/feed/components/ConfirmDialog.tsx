import { Box, Typography } from "@mui/material";
import type { ConfirmDialogProps } from "../types";
import { AppModal } from "./AppModal";
import { PrimaryButton } from "./PrimaryButton";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <AppModal open={open} onClose={onClose} width={360}>
      <Box sx={{ p: 3 }}>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            sx={(theme) => ({
              fontSize: "0.875rem",
              fontWeight: 500,
              color: theme.custom.text.muted,
              mb: 3,
              lineHeight: 1.5,
            })}
          >
            {description}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <PrimaryButton variant="outlined" onClick={onClose}>
            {cancelLabel}
          </PrimaryButton>

          <PrimaryButton onClick={onConfirm}>{confirmLabel}</PrimaryButton>
        </Box>
      </Box>
    </AppModal>
  );
}
