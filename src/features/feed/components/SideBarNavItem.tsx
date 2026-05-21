import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import type { SidebarNavItemProps } from "../types";

export function SidebarNavItem({
  icon,
  label,
  to,
  ...props
}: SidebarNavItemProps) {
  return (
    <NavLink to={to} end={to === "/app"} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Box
          {...props}
          display="flex"
          alignItems="center"
          gap={1}
          sx={(theme) => ({
            width: 170,
            height: 28,
            borderRadius: "999px",
            px: 1,
            py: 1,
            ml: -1,
            mr: 1,
            my: 0.5,
            transition: "background-color 0.2s ease",
            "&:hover": {
              backgroundColor: theme.custom.hover.item,
            },
          })}
        >
          {icon}

          <Typography
            sx={(theme) => ({
              fontSize: "0.875rem",
              fontWeight: isActive ? 800 : 400,
              color: theme.palette.text.primary,
            })}
          >
            {label}
          </Typography>
        </Box>
      )}
    </NavLink>
  );
}
