import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SubmitButton } from "../../../../src/features/auth/components/SubmitButton";

describe("SubmitButton", () => {
  it("should render label when not loading", () => {
    render(<SubmitButton label="Entrar" />);

    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });
  it("renders spinner and disables button when loading", () => {
    render(<SubmitButton label="Entrar" loading />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should be disabled when loading", () => {
    render(<SubmitButton label="Entrar" loading />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<SubmitButton label="Entrar" disabled />);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
