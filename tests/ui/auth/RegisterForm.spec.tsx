import { describe, vi, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RegisterForm } from "../../../src/features/auth/components/RegisterForm";
import type { CreateAccountDto } from "../../../src/features/auth/types";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("RegisterForm", () => {
  const defaultProps = {
    loading: false,
    error: null,
    onSubmit: vi.fn(),
    onSwitchMode: vi.fn(),
  };

  it("should render all form fields", () => {
    render(<RegisterForm {...defaultProps} />);

    expect(screen.getByLabelText(/nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome de usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/url da foto de perfil/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /criar conta/i }),
    ).toBeInTheDocument();
  });

  it("should allow typing into inputs", async () => {
    render(<RegisterForm {...defaultProps} />);

    await userEvent.type(screen.getByLabelText(/nome completo/i), "Test User");
    await userEvent.type(screen.getByLabelText(/nome de usuário/i), "testuser");
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "123456");
    await userEvent.type(
      screen.getByLabelText(/url da foto de perfil/i),
      "https://img.com/user.png",
    );

    expect(screen.getByLabelText(/nome completo/i)).toHaveValue("Test User");
    expect(screen.getByLabelText(/nome de usuário/i)).toHaveValue("testuser");
    expect(screen.getByLabelText(/email/i)).toHaveValue("test@example.com");
    expect(screen.getByLabelText(/senha/i)).toHaveValue("123456");
    expect(screen.getByLabelText(/url da foto de perfil/i)).toHaveValue(
      "https://img.com/user.png",
    );
  });

  it("should call onSubmit with correct data", async () => {
    const onSubmit = vi.fn();

    render(<RegisterForm loading={false} error={null} onSubmit={onSubmit} />);

    const registerData: CreateAccountDto = {
      name: "Test User",
      userName: "testuser",
      email: "test@example.com",
      password: "123456",
      imageUrl: "https://img.com/user.png",
    };

    await userEvent.type(
      screen.getByLabelText(/nome completo/i),
      registerData.name,
    );
    await userEvent.type(
      screen.getByLabelText(/nome de usuário/i),
      registerData.userName,
    );
    await userEvent.type(screen.getByLabelText(/email/i), registerData.email);
    await userEvent.type(
      screen.getByLabelText(/senha/i),
      registerData.password,
    );
    await userEvent.type(
      screen.getByLabelText(/url da foto de perfil/i),
      registerData.imageUrl!,
    );

    await userEvent.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(registerData);
  });

  it("should disable all inputs and button when loading is true", () => {
    render(<RegisterForm {...defaultProps} loading={true} />);

    const button = screen.getByRole("button", { name: /criando/i });
    expect(button).toBeDisabled();

    expect(screen.getByLabelText(/nome completo/i)).toBeDisabled();
    expect(screen.getByLabelText(/nome de usuário/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/senha/i)).toBeDisabled();
    expect(screen.getByLabelText(/url da foto de perfil/i)).toBeDisabled();
  });

  it("should display error message when error exists", () => {
    render(<RegisterForm {...defaultProps} error="Erro ao criar conta" />);
    expect(screen.getByText(/erro ao criar conta/i)).toBeInTheDocument();
  });
});
