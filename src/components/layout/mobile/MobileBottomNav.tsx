import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import { getNavItems } from "../../../navigation/navItems";
import { AppLink } from "./AppLink";

export function MobileBottomNav() {
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const items = getNavItems(userId);

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
      {items.map((item) => (
        <AppLink key={item.label} to={item.to}>
          <item.icon />
        </AppLink>
      ))}
    </Box>
  );
}
