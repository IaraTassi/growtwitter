import { useState } from "react";
import type { ComposerModalProps } from "../types";
import { AppModal } from "./AppModal";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { PrimaryButton } from "./PrimaryButton";
import { COLORS } from "../../../theme/colors";

export function ComposerModal({
  open,
  onClose,
  userImageUrl,
  onSubmit,
  submitLabel = "Tweetar",
}: ComposerModalProps) {
  const [content, setContent] = useState("");
  const MAX_LENGTH = 280;
  const remaining = MAX_LENGTH - content.length;
  const showCounter = remaining <= 60;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContent(e.target.value);
  };

  const handleClose = () => {
    setContent("");
    onClose();
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    await onSubmit(content);
    setContent("");
    onClose();
  };

  return (
    <AppModal open={open} onClose={handleClose}>
      <Box display={"flex"} gap={2} sx={{ p: 1 }}>
        <CustomAvatar imageUrl={userImageUrl} aria-hidden="true" />

        <TextField
          autoFocus
          placeholder="O que está acontecendo?"
          multiline
          minRows={5}
          maxRows={8}
          fullWidth
          variant="standard"
          value={content}
          onChange={handleChange}
          slotProps={{
            input: {
              disableUnderline: true,
              inputProps: { maxLength: MAX_LENGTH },
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              pt: "0.75rem",
            },
            "& .MuiInputBase-input::placeholder": {
              color: COLORS.textTertiary,
              fontSize: "0.875rem",
              fontWeight: 500,
              opacity: 1,
            },
          }}
        />
        {showCounter && (
          <Typography
            variant="caption"
            aria-live="polite"
            sx={{ display: "block", textAlign: "right", mt: 0.5 }}
          >
            {remaining}
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 1, ml: 8, mr: 1 }} />

      <Box display="flex" justifyContent="flex-end" sx={{ p: 0, mr: 1 }}>
        <PrimaryButton onClick={handleSubmit} disabled={!content.trim()}>
          {submitLabel}
        </PrimaryButton>
      </Box>
    </AppModal>
  );
}
