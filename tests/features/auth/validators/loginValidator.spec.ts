import { describe, it, expect } from "vitest";
import { validateLoginData } from "../../../../src/features/auth/validators/loginValidator";

describe("validateLoginData", () => {
  it("should return error for empty identifier", () => {
    const result = validateLoginData(
      { identifier: "", password: "123456" },
      true,
    );

    expect(result.identifier).toBe("Campo obrigatório.");
  });

  it("should validate email mode", () => {
    const result = validateLoginData(
      { identifier: "invalid", password: "123456" },
      true,
    );

    expect(result.identifier).toBe("Email inválido.");
  });

  it("should validate username mode", () => {
    const result = validateLoginData(
      { identifier: "a", password: "123456" },
      false,
    );

    expect(result.identifier).toBe("Nome de usuário inválido.");
  });

  it("should return no errors for valid login", () => {
    const result = validateLoginData(
      { identifier: "user123", password: "123456" },
      false,
    );

    expect(Object.values(result).every((v) => v === "")).toBe(true);
  });
});
