import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal } from "@mui/material";
import { theme } from "../../../theme/theme";
import type { AppModalProps } from "../types";
import { COLORS } from "../../../theme/colors";

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
          sx: {
            backgroundColor: theme.custom.modalBackground,
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          maxWidth: "90vw",
          minHeight: 236,
          backgroundColor: theme.custom.cardExplorer,
          borderRadius: 2,
          padding: 1,
        }}
      >
        <Box display="flex" justifyContent="flex-start">
          <IconButton onClick={onClose} size="small">
            <CloseIcon
              sx={{ width: 17, height: 17, color: COLORS.iconClose }}
            />
          </IconButton>
        </Box>

        {children}
      </Box>
    </Modal>
  );
}
