import type { RegisterFormProps, CreateAccountDto } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";
import { Box, Button, Typography } from "@mui/material";
import { validateRegisterData } from "../validators/registerValidator";
import { AuthTextField } from "./AuthTextField";

export function RegisterForm({
  loading,
  error: apiError,
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

  const [touched, setTouched] = useState<
    Record<keyof CreateAccountDto, boolean>
  >({
    name: false,
    userName: false,
    email: false,
    password: false,
    imageUrl: false,
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name as keyof CreateAccountDto]: true }));

    setErrors((prev) => ({
      ...prev,
      [name as keyof CreateAccountDto]:
        validateRegisterData(registerData)[name as keyof CreateAccountDto],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = {
      ...registerData,
      [name as keyof CreateAccountDto]: value,
    };

    if (touched[name as keyof CreateAccountDto]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name as keyof CreateAccountDto]:
          validateRegisterData(updated)[name as keyof CreateAccountDto],
      }));
    }

    setRegisterData(updated);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateRegisterData(registerData);
    setErrors(newErrors);
    setTouched(
      Object.keys(registerData).reduce(
        (acc, key) => {
          acc[key as keyof CreateAccountDto] = true;
          return acc;
        },
        {} as Record<keyof CreateAccountDto, boolean>,
      ),
    );

    if (Object.values(newErrors).some(Boolean)) return;

    onSubmit(registerData);
  };

  const fields: Array<{
    name: keyof CreateAccountDto;
    label: string;
    type: string;
    required?: boolean;
  }> = [
    { name: "name", label: "Nome completo", type: "text", required: true },
    {
      name: "userName",
      label: "Nome de usuário",
      type: "text",
      required: true,
    },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Senha", type: "password", required: true },
    {
      name: "imageUrl",
      label: "URL da foto de perfil (opcional)",
      type: "url",
    },
  ];

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
        py: 2,
        gap: 1.5,
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
        {fields.map(({ name, label, type }) => (
          <AuthTextField
            key={name}
            name={name}
            label={label}
            type={type}
            value={registerData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={loading}
            errorMessage={touched[name] ? errors[name] : ""}
            helperText={touched[name] ? errors[name] : " "}
          />
        ))}

        <SubmitButton
          label={loading ? "Criando..." : "Criar conta"}
          disabled={loading}
        />

        <AuthError error={apiError} />

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
