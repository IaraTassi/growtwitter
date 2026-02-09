import { describe, vi, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RegisterForm } from "../../../src/features/auth/components/RegisterForm";
import type { CreateAccountDto } from "../../../src/features/auth/types";
import "@testing-library/jest-dom";

describe("RegisterForm", () => {
  const defaultProps = {
    loading: false,
    error: null,
    onSubmit: vi.fn(),
  };

  it("should render all form fields", () => {
    render(<RegisterForm {...defaultProps} />);

    expect(screen.getByRole("textbox", { name: /nome$/i })).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", { name: /nome de usuário/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();

    expect(
      screen.getByLabelText("Senha", { selector: 'input[type="password"]' }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/foto de perfil/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /criar conta/i }),
    ).toBeInTheDocument();
  });

  it("should allow typing into inputs", () => {
    render(<RegisterForm {...defaultProps} />);

    const nameInput = screen.getByLabelText(/nome$/i);
    fireEvent.change(nameInput, { target: { value: "Iara" } });

    expect(nameInput).toHaveValue("Iara");
  });

  it("should call onSubmit with correct data", () => {
    const onSubmit = vi.fn();

    render(<RegisterForm loading={false} error={null} onSubmit={onSubmit} />);

    const registerData: CreateAccountDto = {
      name: "Test User",
      userName: "testuser",
      email: "test@example.com",
      password: "123456",
      imageUrl: "https://img.com/user.png",
    };

    fireEvent.change(screen.getByLabelText(/nome$/i), {
      target: { value: registerData.name },
    });
    fireEvent.change(screen.getByLabelText(/nome de usuário/i), {
      target: { value: registerData.userName },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: registerData.email },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: registerData.password },
    });
    fireEvent.change(screen.getByLabelText(/foto de perfil/i), {
      target: { value: registerData.imageUrl },
    });

    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }));

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith(registerData);
  });

  it("should disable inputs and button when loading is true", () => {
    render(<RegisterForm loading={true} error={null} onSubmit={vi.fn()} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Carregando...");
    expect(screen.getByLabelText(/nome$/i)).toBeDisabled();
  });

  it("should display error message when error exists", () => {
    render(
      <RegisterForm
        loading={false}
        error="Erro ao criar conta"
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByText(/erro ao criar conta/i)).toBeInTheDocument();
  });
});
