import type { CreateAccountDto } from "../types";

function validateRegisterField(
  field: keyof CreateAccountDto,
  value: string,
): string {
  switch (field) {
    case "name":
      if (!value.trim()) return "O nome completo é obrigatório.";
      if (value.length < 2 || value.length > 50)
        return "O nome deve ter entre 2 e 50 caracteres.";
      if (!/^[A-Za-zÀ-ÿ]+( [A-Za-zÀ-ÿ]+)*$/.test(value))
        return "O nome deve conter apenas letras e espaços.";
      return "";

    case "userName":
      if (!value.trim()) return "O nome de usuário é obrigatório.";
      if (!/^[a-zA-Z][a-zA-Z0-9._]{2,19}$/.test(value))
        return "Deve começar e conter apenas letras, números, . ou _ (3 a 20 caracteres).";
      return "";

    case "email":
      if (!value.trim()) return "O email é obrigatório.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido.";
      return "";

    case "password":
      if (!value.trim()) return "A senha é obrigatória.";
      if (value.length < 6) return "A senha deve ter ao menos 6 caracteres.";
      return "";

    case "imageUrl":
      if (!value.trim()) return "";
      try {
        const url = new URL(value);
        if (!/^https?:/.test(url.protocol))
          return "A URL deve começar com http ou https.";
      } catch {
        return "URL inválida.";
      }
      return "";

    default:
      return "";
  }
}

export function validateRegisterData(data: CreateAccountDto) {
  const errors: Record<keyof CreateAccountDto, string> = {
    name: "",
    userName: "",
    email: "",
    password: "",
    imageUrl: "",
  };

  (Object.entries(data) as [keyof CreateAccountDto, string][]).forEach(
    ([key, value]) => {
      errors[key] = validateRegisterField(key, value);
    },
  );

  return errors;
}
