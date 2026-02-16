import type { RegisterFormProps, CreateAccountDto } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";
import { Box, Button, TextField, Typography } from "@mui/material";

export function RegisterForm({
  loading,
  error,
  onSubmit,
  onSwitchMode,
}: RegisterFormProps) {
  const [registerData, setRegisterData] = useState<CreateAccountDto>({
    name: "",
    userName: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState<Record<keyof CreateAccountDto, string>>({
    name: "",
    userName: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  function validateField(field: keyof CreateAccountDto, value: string): string {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validateField(name as keyof CreateAccountDto, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<keyof CreateAccountDto, string> = {
      name: "",
      userName: "",
      email: "",
      password: "",
      imageUrl: "",
    };

    (Object.keys(registerData) as (keyof CreateAccountDto)[]).forEach((key) => {
      const errorMessage = validateField(key, registerData[key] || "");
      if (errorMessage) {
        newErrors[key] = errorMessage;
      }
    });

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    onSubmit(registerData);
  };

  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 3,
        py: 3,
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        textAlign="center"
        fontWeight={500}
      >
        Criar sua conta
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        aria-busy={loading || undefined}
        data-testid="register-form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          name="name"
          label="Nome completo"
          type="text"
          value={registerData.name}
          onChange={handleChange}
          disabled={loading}
          required
          error={!!errors.name}
          helperText={errors.name || " "}
          size="small"
          fullWidth
          slotProps={{
            htmlInput: { maxLength: 50 },
          }}
        />

        <TextField
          name="userName"
          label="Nome de usuário"
          type="text"
          value={registerData.userName}
          onChange={handleChange}
          disabled={loading}
          required
          error={!!errors.userName}
          helperText={errors.userName || " "}
          size="small"
          fullWidth
        />

        <TextField
          name="email"
          label="Email"
          type="email"
          value={registerData.email}
          onChange={handleChange}
          disabled={loading}
          required
          error={!!errors.email}
          helperText={errors.email || " "}
          size="small"
          fullWidth
        />

        <TextField
          name="password"
          label="Senha"
          type="password"
          value={registerData.password}
          onChange={handleChange}
          disabled={loading}
          required
          error={!!errors.password}
          helperText={errors.password || " "}
          size="small"
          fullWidth
        />

        <TextField
          name="imageUrl"
          label="URL da foto de perfil (opcional)"
          type="url"
          value={registerData.imageUrl}
          onChange={handleChange}
          disabled={loading}
          error={!!errors.imageUrl}
          helperText={errors.imageUrl || " "}
          size="small"
          fullWidth
        />

        <SubmitButton
          label={loading ? "Criando..." : "Criar conta"}
          disabled={loading}
        />

        <AuthError error={error} />

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "text.secondary", pt: 1.5, fontSize: "1rem" }}
        >
          Já tem conta?{" "}
          <Button
            type="button"
            variant="text"
            onClick={onSwitchMode}
            size="medium"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              minWidth: "auto",
              px: 0.5,
            }}
          >
            Entrar
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
