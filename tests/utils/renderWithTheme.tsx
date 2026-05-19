import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { ThemeModeProvider } from "../../src/theme/ThemeModeProvider";

export function renderWithTheme(ui: ReactElement) {
  return render(<ThemeModeProvider>{ui}</ThemeModeProvider>);
}
