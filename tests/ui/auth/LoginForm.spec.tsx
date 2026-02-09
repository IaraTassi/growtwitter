import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "../../../src/features/auth/components/LoginForm";
import type { LoginDto } from "../../../src/features/auth/types";
import "@testing-library/jest-dom";

describe("LoginForm", () => {
  const defaultProps = {
    loading: false,
    error: null,
    onSubmit: vi.fn(),
  };

  it("renders all fields and button", () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /usar nome de usuário/i }),
    ).toBeInTheDocument();
  });

  it("allows typing in inputs", () => {
    render(<LoginForm {...defaultProps} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "123456" },
    });

    expect(screen.getByLabelText(/email/i)).toHaveValue("test@example.com");
    expect(screen.getByLabelText(/senha/i)).toHaveValue("123456");
  });

  it("calls onSubmit with correct data", () => {
    const onSubmit = vi.fn();
    render(<LoginForm {...defaultProps} onSubmit={onSubmit} />);

    const loginData: LoginDto = { identifier: "testuser", password: "123456" };

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: loginData.identifier },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: loginData.password },
    });

    fireEvent.submit(screen.getByTestId("login-form"));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(loginData);
  });

  it("disables inputs and button when loading", () => {
    render(<LoginForm {...defaultProps} loading={true} />);

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/senha/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /entrando.../i })).toBeDisabled();
  });

  it("displays error message when error exists", () => {
    render(<LoginForm {...defaultProps} error="Usuário ou senha incorretos" />);

    expect(
      screen.getByText(/usuário ou senha incorretos/i),
    ).toBeInTheDocument();
  });
});
