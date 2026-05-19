import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RegisterTextContent } from "../../../../src/features/auth/components/RegisterTextContent";
import { renderWithTheme } from "../../../utils/renderWithTheme";

describe("RegisterTextContent", () => {
  it("renders static register text content", () => {
    renderWithTheme(<RegisterTextContent />);

    expect(
      screen.getByRole("heading", { level: 2, name: /growtwitter/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/trabalho final do bloco intermediário/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/crie sua conta e faça parte do growtwitter/i),
    ).toBeInTheDocument();
  });
});
