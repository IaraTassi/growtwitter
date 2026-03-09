import { Box, Typography } from "@mui/material";
import type { SidebarUserProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { PrimaryButton } from "./PrimaryButton";

export function SidebarUser({
  name,
  userName,
  imageUrl,
  onLogout,
}: SidebarUserProps) {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          width: 170,
          height: 48,
          borderRadius: "999px",
          transition: "background 0.2s",
          px: 1,
          py: 1,
          ml: -1,
          mr: 1,
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
          },
        }}
      >
        <CustomAvatar imageUrl={imageUrl} />

        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{ fontSize: 12, fontWeight: 400 }}
            color="text.disabled"
          >
            @{userName}
          </Typography>
        </Box>
      </Box>

      <Box>
        <PrimaryButton
          variant="outlined"
          onClick={onLogout}
          sx={{
            width: 162,
            height: 28,
            textTransform: "none",
            borderRadius: "1rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            borderWidth: "1px",
            color: "primary.main",
            borderColor: "primary.main",
            backgroundColor: "transparent",
            "&:hover": {
              borderColor: "primary.light",
              backgroundColor: "rgba(29,155,240,0.08)",
            },
          }}
        >
          Sair
        </PrimaryButton>
      </Box>
    </Box>
  );
}
