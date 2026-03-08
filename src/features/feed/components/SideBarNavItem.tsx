import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import type { SidebarNavItemProps } from "../types";

export function SidebarNavItem({ icon, label, to }: SidebarNavItemProps) {
  return (
    <NavLink to={to} end={to === "/app"} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{
            width: 170,
            height: 28,
            borderRadius: "999px",
            transition: "background 0.2s",
            px: 1,
            py: 1,
            ml: -1,
            mr: 1,
            my: 0.5,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
            },
          }}
        >
          {icon}

          <Typography
            sx={{
              color: "text.primary",
              fontSize: "0.875rem",
              fontWeight: isActive ? 800 : 400,
            }}
          >
            {label}
          </Typography>
        </Box>
      )}
    </NavLink>
  );
}
