import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { IdentifierToggle } from "../../../src/features/auth/components/IdentifierToggle";

describe("IdentifierToggle", () => {
  it("should render with 'Usar nome de usuário' when mode is email", () => {
    render(<IdentifierToggle identifierMode="email" onToggle={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /usar nome de usuário/i }),
    ).toBeInTheDocument();
  });

  it("should render with 'Usar email' when mode is username", () => {
    render(<IdentifierToggle identifierMode="username" onToggle={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /usar email/i }),
    ).toBeInTheDocument();
  });

  it("should call onToggle when clicked", () => {
    const onToggle = vi.fn();

    render(<IdentifierToggle identifierMode="email" onToggle={onToggle} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it("should be disabled when loading is true", () => {
    render(
      <IdentifierToggle identifierMode="email" onToggle={vi.fn()} loading />,
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
