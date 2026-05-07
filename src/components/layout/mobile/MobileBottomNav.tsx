import { Box } from "@mui/material";
import { HomeIcon } from "../../../features/feed/utils/icons/HomeIcon";
import { ExplorerIcon } from "../../../features/feed/utils/icons/ExplorerIcon";
import { PrimaryButton } from "../../../features/feed/components/PrimaryButton";
import { ProfileIcon } from "../../../features/feed/utils/icons/ProfileIcon";

export function MobileBottomNav() {
  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 56,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        bgcolor: theme.custom.layout.inner,
        borderTop: `1px solid ${theme.palette.divider}`,
        zIndex: 1100,
      })}
    >
      <HomeIcon />
      <ExplorerIcon />
      <PrimaryButton children={undefined} />
      <ProfileIcon />
    </Box>
  );
}
