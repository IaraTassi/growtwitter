import "@testing-library/jest-dom";
import { describe, vi, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthTextField } from "../../../../src/features/auth/components/AuthTextField";
import userEvent from "@testing-library/user-event";

describe("AuthTextField", () => {
  const onChange = vi.fn();

  it("renders with label and value", () => {
    render(
      <AuthTextField
        label="Email"
        value=""
        onChange={onChange}
        errorMessage=""
      />,
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("displays error message if provided", () => {
    render(
      <AuthTextField
        label="Email"
        value=""
        onChange={onChange}
        errorMessage="Email inválido"
      />,
    );

    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    render(
      <AuthTextField
        label="Email"
        value=""
        onChange={onChange}
        errorMessage=""
      />,
    );

    await user.type(screen.getByLabelText(/email/i), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("respects disabled state", () => {
    render(
      <AuthTextField
        label="Email"
        value=""
        onChange={onChange}
        disabled
        errorMessage=""
      />,
    );

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
  });
});
