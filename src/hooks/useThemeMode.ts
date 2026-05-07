import { useContext } from "react";
import { ThemeModeContext } from "../theme/ThemeModeProvider";

export function useThemeMode() {
  return useContext(ThemeModeContext);
}
