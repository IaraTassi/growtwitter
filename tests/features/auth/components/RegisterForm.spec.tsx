import { describe, vi, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { RegisterForm } from "../../../../src/features/auth/components/RegisterForm";
import type { CreateAccountDto } from "../../../../src/features/auth/types";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../utils/renderWithTheme";

describe("RegisterForm", () => {
  const defaultProps = {
    loading: false,
    error: null,
    onSubmit: vi.fn(),
    onSwitchMode: vi.fn(),
  };

  it("should render all form fields and submit button", () => {
    renderWithTheme(<RegisterForm {...defaultProps} />);

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
    const user = userEvent.setup({ delay: null });
    renderWithTheme(<RegisterForm {...defaultProps} />);

    await user.type(screen.getByLabelText(/nome completo/i), "Test User");
    await user.type(screen.getByLabelText(/nome de usuário/i), "testuser");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/senha/i), "123456");
    await user.type(
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
    const user = userEvent.setup({ delay: null });
    const onSubmit = vi.fn();

    renderWithTheme(<RegisterForm {...defaultProps} onSubmit={onSubmit} />);

    const data: CreateAccountDto = {
      name: "Test User",
      userName: "testuser",
      email: "test@example.com",
      password: "123456",
      imageUrl: "https://img.com/user.png",
    };

    await user.type(screen.getByLabelText(/nome completo/i), data.name);
    await user.type(screen.getByLabelText(/nome de usuário/i), data.userName);
    await user.type(screen.getByLabelText(/email/i), data.email);
    await user.type(screen.getByLabelText(/senha/i), data.password);
    await user.type(
      screen.getByLabelText(/url da foto de perfil/i),
      data.imageUrl?.toString() || "",
    );

    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(data);
  });

  it("should disable all inputs and button when loading is true", () => {
    renderWithTheme(<RegisterForm {...defaultProps} loading={true} />);

    expect(
      screen.getByRole("textbox", { name: /nome completo/i }),
    ).toBeDisabled();
    expect(
      screen.getByRole("textbox", { name: /nome de usuário/i }),
    ).toBeDisabled();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeDisabled();
    expect(screen.getByLabelText(/senha/i)).toBeDisabled();

    const imageUrlInput = screen.getAllByRole("textbox", {
      name: /url da foto de perfil/i,
    })[0];
    expect(imageUrlInput).toBeDisabled();

    expect(screen.getByRole("button", { name: /criando.../i })).toBeDisabled();
  });

  it("displays error message when error exists", () => {
    renderWithTheme(
      <RegisterForm {...defaultProps} error="Erro ao criar conta" />,
    );
    expect(screen.getByText(/erro ao criar conta/i)).toBeInTheDocument();
  });

  it("should not submit if required fields are empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    renderWithTheme(<RegisterForm {...defaultProps} onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should call onSwitchMode when switch button is clicked", async () => {
    const user = userEvent.setup();
    const onSwitchMode = vi.fn();

    renderWithTheme(
      <RegisterForm {...defaultProps} onSwitchMode={onSwitchMode} />,
    );

    const switchButton = screen.getByRole("button", {
      name: /já tem conta|entrar/i,
    });

    await user.click(switchButton);

    expect(onSwitchMode).toHaveBeenCalledTimes(1);
  });
});
