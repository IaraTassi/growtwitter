import type { LoginDto } from "../types";

export function validateLoginField(
  field: keyof LoginDto,
  value: string,
  isEmailMode: boolean,
): string {
  const isEmail = isEmailMode;

  switch (field) {
    case "identifier":
      if (!value.trim()) return "Campo obrigatório.";

      if (isEmail) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido.";
      } else {
        if (!/^[a-zA-Z][a-zA-Z0-9._]{2,19}$/.test(value))
          return "Nome de usuário inválido.";
      }
      return "";

    case "password":
      if (!value.trim()) return "A senha é obrigatória.";
      if (value.length < 6) return "A senha deve ter ao menos 6 caracteres.";
      return "";

    default:
      return "";
  }
}

export function validateLoginData(data: LoginDto, isEmailMode: boolean) {
  const errors: Record<keyof LoginDto, string> = {
    identifier: "",
    password: "",
  };

  (Object.keys(data) as (keyof LoginDto)[]).forEach((key) => {
    errors[key] = validateLoginField(key, data[key], isEmailMode);
  });

  return errors;
}
