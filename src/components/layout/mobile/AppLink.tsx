import { Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

type AppLinkProps = {
  to: string;
  children: React.ReactNode;
};

export function AppLink({ to, children }: AppLinkProps) {
  const location = useLocation();

  const isActive =
    to === "/app"
      ? location.pathname === "/app"
      : location.pathname.startsWith(to);

  return (
    <Box
      component={Link}
      to={to}
      sx={(theme) => ({
        textDecoration: "none",
        color: isActive
          ? theme.palette.primary.main
          : theme.palette.text.primary,

        display: "flex",
        alignItems: "center",
        gap: 1,

        fontWeight: isActive ? 700 : 500,
        transition: "all 0.2s ease",
      })}
    >
      {children}
    </Box>
  );
}
