import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginForm } from "../../../src/features/auth/components/LoginForm";
import type { LoginDto } from "../../../src/features/auth/types";

describe("LoginForm", () => {
  const defaultProps = {
    loading: false,
    error: null,
    onSubmit: vi.fn(),
    onSwitchMode: vi.fn(),
  };

  it("renders all fields and buttons", () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /usar nome de usuário/i }),
    ).toBeInTheDocument();
  });

  it("allows typing in inputs", async () => {
    const user = userEvent.setup();
    render(<LoginForm {...defaultProps} />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/senha/i), "123456");

    expect(screen.getByLabelText(/email/i)).toHaveValue("test@example.com");
    expect(screen.getByLabelText(/senha/i)).toHaveValue("123456");
  });

  it("calls onSubmit with correct data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm {...defaultProps} onSubmit={onSubmit} />);

    const loginData: LoginDto = {
      identifier: "test@example.com",
      password: "123456",
    };

    await user.type(screen.getByLabelText(/email/i), loginData.identifier);
    await user.type(screen.getByLabelText(/senha/i), loginData.password);

    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(loginData);
  });

  it("disables inputs and button when loading is true", () => {
    render(<LoginForm {...defaultProps} loading={true} />);

    const button = screen.getByRole("button", { name: /carregando/i });
    expect(button).toBeDisabled();

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/senha/i)).toBeDisabled();
  });

  it("displays error message when error exists", () => {
    render(<LoginForm {...defaultProps} error="Usuário ou senha incorretos" />);

    expect(
      screen.getByText(/usuário ou senha incorretos/i),
    ).toBeInTheDocument();
  });
});
