import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal } from "@mui/material";
import type { AppModalProps } from "../types";

export function AppModal({
  open,
  onClose,
  width = 454,
  children,
}: AppModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: (theme) => ({
            backgroundColor: theme.custom.overlay.modal,
          }),
        },
      }}
    >
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          maxWidth: "90vw",
          minHeight: 236,
          borderRadius: 2,
          padding: 1,
          bgcolor: theme.custom.card,
        })}
      >
        <Box display="flex" justifyContent="flex-start">
          <IconButton onClick={onClose} size="small">
            <CloseIcon
              sx={(theme) => ({
                width: 17,
                height: 17,
                color: theme.custom.icon.secondary,
              })}
            />
          </IconButton>
        </Box>

        {children}
      </Box>
    </Modal>
  );
}
