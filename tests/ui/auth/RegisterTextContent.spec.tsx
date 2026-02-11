import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RegisterTextContent } from "../../../src/features/auth/layouts/RegisterTextContent";

describe("RegisterTextContent", () => {
  it("renders static text and switch button", () => {
    render(<RegisterTextContent onSwitchMode={vi.fn()} />);

    expect(
      screen.getByRole("heading", { level: 2, name: /growtwitter/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/trabalho final do bloco intermediário/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/uma rede social pensada para quem valoriza/i),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });
});
