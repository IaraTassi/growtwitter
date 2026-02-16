import type { LoginFormProps, LoginDto, IdentifierMode } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";
import { Box, Button, TextField, Typography } from "@mui/material";

export function LoginForm({
  loading,
  error,
  onSubmit,
  onSwitchMode,
}: LoginFormProps) {
  const [loginData, setLoginData] = useState<LoginDto>({
    identifier: "",
    password: "",
  });
  const [identifierMode, setIdentifierMode] = useState<IdentifierMode>("email");

  const [errors, setErrors] = useState<Record<keyof LoginDto, string>>({
    identifier: "",
    password: "",
  });

  const isEmail = identifierMode === "email";

  function validateField(field: keyof LoginDto, value: string): string {
    switch (field) {
      case "identifier":
        if (!value.trim()) return "Campo obrigatório.";

        if (isEmail) {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Email inválido.";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validateField(name as keyof LoginDto, value);

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<keyof LoginDto, string> = {
      identifier: "",
      password: "",
    };

    (Object.keys(loginData) as (keyof LoginDto)[]).forEach((key) => {
      const errorMessage = validateField(key, loginData[key] || "");
      if (errorMessage) {
        newErrors[key] = errorMessage;
      }
    });

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    onSubmit(loginData);
  };

  return (
    <Box
      component="section"
      sx={{
        flex: 1,
        bgcolor: "background.default",
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
        Entrar no Growtwitter
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        aria-busy={loading || undefined}
        data-testid="login-form"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ width: "100%", fontSize: "0.875rem" }}>
          <TextField
            name="identifier"
            label={isEmail ? "Email" : "Nome de usuário"}
            type={isEmail ? "email" : "text"}
            value={loginData.identifier}
            onChange={handleChange}
            disabled={loading}
            required
            error={!!errors.identifier}
            size="small"
            fullWidth
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: errors.identifier ? "error.main" : "transparent",
              }}
            >
              {errors.identifier || "placeholder"}
            </Typography>

            <Button
              type="button"
              onClick={() => setIdentifierMode(isEmail ? "userName" : "email")}
              size="small"
              variant="text"
              sx={{
                minWidth: "auto",
                textTransform: "none",
                fontSize: "0.75rem",
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              {isEmail ? "Usar nome de usuário" : "Usar email"}
            </Button>
          </Box>
        </Box>

        <TextField
          name="password"
          label="Senha"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          disabled={loading}
          required
          error={!!errors.password}
          helperText={errors.password || " "}
          size="small"
          fullWidth
        />

        <SubmitButton label="Entrar" loading={loading} disabled={loading} />

        <AuthError error={error} />

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ color: "text.secondary", pt: 1.5, fontSize: "1rem" }}
        >
          Não tem conta?{" "}
          <Button
            type="button"
            onClick={onSwitchMode}
            variant="text"
            size="medium"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              minWidth: "auto",
              px: 0.5,
            }}
          >
            Inscreva-se
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
