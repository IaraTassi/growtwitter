import { createContext } from "react";

export type ThemeMode = "light" | "dark";

export type ThemeModeContextType = {
  mode: ThemeMode;
  toggleTheme: () => void;
};

export const ThemeModeContext = createContext({} as ThemeModeContextType);
