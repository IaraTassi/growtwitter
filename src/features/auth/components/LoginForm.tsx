import type { LoginFormProps, LoginDto, IdentifierMode } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";
import { Box, Button, Typography } from "@mui/material";
import { validateLoginData } from "../validators/loginValidator";
import { AuthTextField } from "./AuthTextField";

export function LoginForm({
  loading,
  error: apiError,
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

  const [touched, setTouched] = useState<Record<keyof LoginDto, boolean>>({
    identifier: false,
    password: false,
  });

  const isEmail = identifierMode === "email";

  const handleSwitchMode = () => {
    setIdentifierMode((prev) => {
      const nextMode = prev === "email" ? "userName" : "email";

      setErrors((e) => ({ ...e, identifier: "" }));
      setTouched((t) => ({ ...t, identifier: false }));

      return nextMode;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name as keyof LoginDto]: true }));

    setErrors((prev) => ({
      ...prev,
      [name as keyof LoginDto]: validateLoginData(loginData, isEmail)[
        name as keyof LoginDto
      ],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = {
      ...loginData,
      [name as keyof LoginDto]: value,
    };

    if (touched[name as keyof LoginDto]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name as keyof LoginDto]: validateLoginData(updated, isEmail)[
          name as keyof LoginDto
        ],
      }));
    }
    setLoginData(updated);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateLoginData(loginData, isEmail);
    setErrors(newErrors);
    setTouched(
      Object.keys(loginData).reduce(
        (acc, key) => {
          acc[key as keyof LoginDto] = true;
          return acc;
        },
        {} as Record<keyof LoginDto, boolean>,
      ),
    );

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
        py: 2,
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
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Box sx={{ width: "100%", fontSize: "0.875rem" }}>
          <AuthTextField
            name="identifier"
            label={isEmail ? "Email" : "Nome de usuário"}
            type={isEmail ? "email" : "text"}
            value={loginData.identifier}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            spellCheck={false}
            errorMessage={
              touched.identifier && errors.identifier ? errors.identifier : ""
            }
            helperContent={
              <>
                <Typography
                  variant="caption"
                  sx={{
                    color: errors.identifier ? "error.main" : "text.disabled",
                  }}
                >
                  {touched.identifier && errors.identifier
                    ? errors.identifier
                    : " "}
                </Typography>

                <Button
                  type="button"
                  onClick={handleSwitchMode}
                  size="small"
                  variant="text"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.75rem",
                    minWidth: "auto",
                    color: "text.secondary",
                  }}
                >
                  {isEmail ? "Usar nome de usuário" : "Usar email"}
                </Button>
              </>
            }
          />
        </Box>

        <AuthTextField
          name="password"
          label="Senha"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          spellCheck={false}
          errorMessage={
            touched.password && errors.password ? errors.password : ""
          }
          helperText={
            touched.password && errors.password ? errors.password : " "
          }
        />

        <SubmitButton label="Entrar" loading={loading} disabled={loading} />

        <AuthError error={apiError} />

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
