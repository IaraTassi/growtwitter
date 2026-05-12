import AddIcon from "@mui/icons-material/Add";
import { Box, Fab } from "@mui/material";
import { useState } from "react";
import { ComposerModal } from "../../../features/feed/components/ComposerModal";
import type { MobileTweetButtonProps } from "../../../type";

export function MobileTweetButton({
  userImageUrl,
  onSubmit,
}: MobileTweetButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={(theme) => ({
          position: "absolute",
          top: -26,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1200,
          backgroundColor: theme.custom.layout.inner,
          borderRadius: "50%",
          p: 0.75,
        })}
      >
        <Fab
          aria-label="Tweetar"
          onClick={() => setOpen(true)}
          sx={(theme) => ({
            width: 37,
            height: 37,
            backgroundColor: theme.custom.button.primary.default,
            color: theme.palette.common.white,
            transition: "all 0.2s ease",

            "&:hover": {
              backgroundColor: theme.custom.button.primary.hover,
            },

            "&:active": {
              transform: "scale(0.97)",
            },
          })}
        >
          <AddIcon />
        </Fab>
      </Box>

      <ComposerModal
        open={open}
        onClose={() => setOpen(false)}
        userImageUrl={userImageUrl}
        onSubmit={onSubmit}
      />
    </>
  );
}
