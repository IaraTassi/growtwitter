import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoginTextContent } from "../../../../src/features/auth/components/LoginTextContent";
import { renderWithTheme } from "../../../utils/renderWithTheme";

describe("LoginTextContent", () => {
  it("renders static text and login form", () => {
    renderWithTheme(<LoginTextContent />);

    expect(
      screen.getByRole("heading", { level: 2, name: /growtwitter/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/trabalho final do bloco intermediário/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/plataforma definitiva para todos os apaixonados/i),
    ).toBeInTheDocument();
  });
});
