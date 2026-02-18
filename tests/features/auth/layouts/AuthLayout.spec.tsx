import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AuthLayout } from "../../../../src/features/auth/layouts/AuthLayout";

describe("AuthLayout", () => {
  it("renders left and right content", () => {
    render(
      <AuthLayout
        left={<p>Conteúdo esquerdo</p>}
        right={<p>Conteúdo direito</p>}
      />,
    );

    expect(screen.getByText(/conteúdo esquerdo/i)).toBeInTheDocument();
    expect(screen.getByText(/conteúdo direito/i)).toBeInTheDocument();
  });
});
