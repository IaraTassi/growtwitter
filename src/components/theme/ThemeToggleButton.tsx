import { IconButton } from "@mui/material";
import { useThemeMode } from "../../hooks/useThemeMode";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <IconButton
      onClick={toggleTheme}
      disableRipple
      sx={{
        p: 0.5,
        backgroundColor: "transparent",

        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      {mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </IconButton>
  );
}
