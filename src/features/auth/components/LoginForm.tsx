import type { LoginFormProps, LoginDto, IdentifierMode } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";
import { Box, Button, TextField, Typography } from "@mui/material";
import { validateLoginData } from "../validators/loginValidator";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name as keyof LoginDto]: value }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateLoginData(loginData, isEmail);
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

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
