import { describe, vi, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
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

  it("should render all form fields and button", () => {
    render(<RegisterForm {...defaultProps} />);

    expect(
      screen.getByRole("textbox", { name: /nome completo/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /nome de usuário/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();

    const imageUrlInputs = screen.getAllByRole("textbox", {
      name: /url da foto de perfil/i,
    });
    expect(imageUrlInputs[0]).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /criar conta/i }),
    ).toBeInTheDocument();
  });

  it("should allow typing into inputs", async () => {
    const user = userEvent.setup();
    render(<RegisterForm {...defaultProps} />);

    const nameInput = screen.getByRole("textbox", { name: /nome completo/i });
    const userNameInput = screen.getByRole("textbox", {
      name: /nome de usuário/i,
    });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText(/senha/i);

    const imageUrlInputs = screen.getAllByRole("textbox", {
      name: /url da foto de perfil/i,
    });
    const imageUrlInput = imageUrlInputs[0];

    await user.type(nameInput, "Test User");
    await user.type(userNameInput, "testuser");
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "123456");
    await user.type(imageUrlInput, "https://img.com/user.png");

    expect(nameInput).toHaveValue("Test User");
    expect(userNameInput).toHaveValue("testuser");
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("123456");
    expect(imageUrlInput).toHaveValue("https://img.com/user.png");
  });

  it("should call onSubmit with correct data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<RegisterForm {...defaultProps} onSubmit={onSubmit} />);

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
      data.imageUrl || "",
    );

    await user.click(screen.getByRole("button", { name: /criar conta/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith(data);
  });

  it("should disable all inputs and button when loading is true", () => {
    render(<RegisterForm {...defaultProps} loading={true} />);

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
    render(<RegisterForm {...defaultProps} error="Erro ao criar conta" />);
    expect(screen.getByText(/erro ao criar conta/i)).toBeInTheDocument();
  });
});
