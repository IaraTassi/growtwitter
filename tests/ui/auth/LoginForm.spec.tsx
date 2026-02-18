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

  it("should render email, password and submit button", () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("should allow typing into inputs", async () => {
    const user = userEvent.setup();
    render(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "123456");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("123456");
  });

  it("should calls onSubmit with correct data", async () => {
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

  it("should disable all inputs and button when loading is true", () => {
    render(<LoginForm {...defaultProps} loading={true} />);

    const button = screen.getByRole("button", { name: /entrando.../i });
    expect(button).toBeDisabled();

    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/senha/i)).toBeDisabled();
  });

  it("should displays error message when error exists", () => {
    render(<LoginForm {...defaultProps} error="Usuário ou senha incorretos" />);

    expect(
      screen.getByText(/usuário ou senha incorretos/i),
    ).toBeInTheDocument();
  });

  it("should not submit if fields are empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm {...defaultProps} onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should call onSwitchMode when switch button is clicked", async () => {
    const user = userEvent.setup();
    const onSwitchMode = vi.fn();

    render(<LoginForm {...defaultProps} onSwitchMode={onSwitchMode} />);

    const switchButton = screen.getByRole("button", {
      name: /criar conta|inscreva-se/i,
    });

    await user.click(switchButton);

    expect(onSwitchMode).toHaveBeenCalledTimes(1);
  });
});
