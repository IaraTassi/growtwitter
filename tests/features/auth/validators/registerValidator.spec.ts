import { describe, it, expect } from "vitest";
import { validateRegisterData } from "../../../../src/features/auth/validators/registerValidator";

describe("validateRegisterData", () => {
  it("should return error for empty name", () => {
    const result = validateRegisterData({
      name: "",
      userName: "testuser",
      password: "123456",
      email: "test@example.com",
      imageUrl: "https://img.com/user.png",
    });

    expect(result.name).toBe("O nome completo é obrigatório.");
  });

  it("should return error for invalid email", () => {
    const result = validateRegisterData({
      name: "Test User",
      userName: "testuser",
      email: "invalid-email",
      password: "123456",
      imageUrl: "https://img.com/user.png",
    });

    expect(result.email).toBe("Email inválido.");
  });

  it("should return no errors for valid data", () => {
    const result = validateRegisterData({
      name: "Test User",
      userName: "testuser",
      email: "test@example.com",
      password: "123456",
      imageUrl: "https://img.com/user.png",
    });

    expect(Object.values(result).every((v) => v === "")).toBe(true);
  });
});
