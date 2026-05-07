import { Box } from "@mui/material";
import { Logo } from "../../../features/feed/utils/icons/Logo";
import { ThemeToggleButton } from "../../theme/ThemeToggleButton";

export function MobileTopBar() {
  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        bgcolor: theme.custom.layout.inner,
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1100,
      })}
    >
      <Logo />
      <ThemeToggleButton />
    </Box>
  );
}
