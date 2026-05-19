import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock("@mui/icons-material/DarkModeOutlined", () => ({
  default: () => null,
}));

vi.mock("@mui/icons-material/LightModeOutlined", () => ({
  default: () => null,
}));

vi.mock("@mui/icons-material", () => ({
  Visibility: () => null,
  VisibilityOff: () => null,
}));
