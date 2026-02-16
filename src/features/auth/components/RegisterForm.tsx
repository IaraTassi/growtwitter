import type { RegisterFormProps, CreateAccountDto } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";
import { Box, Button, Typography } from "@mui/material";
import { validateRegisterData } from "../validators/registerValidator";
import { AuthTextField } from "./AuthTextField";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name as keyof CreateAccountDto]: value,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateRegisterData(registerData);
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

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
        <AuthTextField
          name="name"
          label="Nome completo"
          type="text"
          value={registerData.name}
          onChange={handleChange}
          disabled={loading}
          required
          errorMessage={errors.name}
          slotProps={{
            htmlInput: { maxLength: 50 },
          }}
        />

        <AuthTextField
          name="userName"
          label="Nome de usuário"
          type="text"
          value={registerData.userName}
          onChange={handleChange}
          disabled={loading}
          required
          errorMessage={errors.userName}
        />

        <AuthTextField
          name="email"
          label="Email"
          type="email"
          value={registerData.email}
          onChange={handleChange}
          disabled={loading}
          required
          errorMessage={errors.email}
        />

        <AuthTextField
          name="imageUrl"
          label="URL da foto de perfil (opcional)"
          type="url"
          value={registerData.imageUrl}
          onChange={handleChange}
          disabled={loading}
          errorMessage={errors.imageUrl}
          fullWidth
        />

        <AuthTextField
          name="password"
          label="Senha"
          type="password"
          value={registerData.password}
          onChange={handleChange}
          disabled={loading}
          required
          errorMessage={errors.password}
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
