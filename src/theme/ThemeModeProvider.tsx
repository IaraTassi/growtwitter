import { useMemo, useState } from "react";
import { ThemeModeContext, type ThemeMode } from "./ThemeModeContext";
import { createAppTheme } from "./createAppTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const THEME_STORAGE_KEY = "theme-mode";

  const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    return savedTheme === "light" ? "light" : "dark";
  };
  const [mode, setMode] = useState<ThemeMode>(getInitialTheme());

  const toggleTheme = () => {
    setMode((prev) => {
      const nextTheme = prev === "light" ? "dark" : "light";

      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  };

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
