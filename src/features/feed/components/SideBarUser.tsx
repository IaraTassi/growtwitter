import { Box, Typography } from "@mui/material";
import type { SidebarUserProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { PrimaryButton } from "./PrimaryButton";
import { ProfileLink } from "./ProfileLink";

export function SidebarUser({
  userId,
  name,
  userName,
  imageUrl,
  onLogout,
}: SidebarUserProps) {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <ProfileLink userId={userId}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={(theme) => ({
            width: 170,
            height: 48,
            borderRadius: "999px",
            px: 1,
            py: 1,
            ml: -1,
            mr: 1,
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: theme.custom.hover.item,
            },
          })}
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
              sx={(theme) => ({
                fontSize: 12,
                fontWeight: 400,
                color: theme.custom.text.muted,
              })}
            >
              @{userName}
            </Typography>
          </Box>
        </Box>
      </ProfileLink>
      <Box>
        <PrimaryButton
          data-cy="logout"
          variant="outlined"
          onClick={onLogout}
          sx={{
            width: 162,
            height: 28,
          }}
        >
          Sair
        </PrimaryButton>
      </Box>
    </Box>
  );
}
