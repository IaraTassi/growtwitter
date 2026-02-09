import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthError } from "../../../src/features/auth/components/AuthError";
import "@testing-library/jest-dom";

describe("AuthError", () => {
  it("should render nothing when no error is provided", () => {
    render(<AuthError error={null} />);
    expect(screen.queryByText(/./)).toBeNull();
  });

  it("should display a string error message", () => {
    render(<AuthError error="Erro de autenticação" />);
    expect(screen.getByText(/erro de autenticação/i)).toBeInTheDocument();
  });

  it("should display an ApiError object message", () => {
    const apiError = { message: "Email inválido" };
    render(<AuthError error={apiError} />);
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
  });
});
