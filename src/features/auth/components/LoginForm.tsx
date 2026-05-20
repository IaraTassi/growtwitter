import type { LoginFormProps, LoginDto, IdentifierMode } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { validateLoginData } from "../validators/loginValidator";
import { AuthTextField } from "./AuthTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ThemeToggleButton } from "../../../components/theme/ThemeToggleButton";

export function LoginForm({
  loading,
  error: apiError,
  onSubmit,
  onSwitchMode,
  onInteraction,
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

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

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
    onInteraction?.();

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
      sx={(theme) => ({
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: 3,
        py: 1.5,
        gap: 1.5,
        bgcolor: theme.custom.auth.form,
      })}
    >
      <Box display="flex" justifyContent="flex-end">
        <ThemeToggleButton />
      </Box>

      <Typography
        component="h2"
        variant="h5"
        textAlign="center"
        fontWeight={600}
        sx={{
          mb: 0.5,
        }}
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
                  sx={(theme) => ({
                    color: errors.identifier
                      ? theme.palette.error.main
                      : theme.custom.text.muted,
                  })}
                >
                  {touched.identifier && errors.identifier
                    ? errors.identifier
                    : " "}
                </Typography>

                <Button
                  data-cy="switch-login-mode"
                  type="button"
                  onClick={handleSwitchMode}
                  size="small"
                  variant="text"
                  sx={(theme) => ({
                    textTransform: "none",
                    fontSize: "0.75rem",
                    minWidth: "auto",
                    color: theme.custom.text.muted,
                  })}
                >
                  {isEmail ? "Usar nome de usuário" : "Usar email"}
                </Button>
              </>
            }
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "0.5rem 0.75rem",
                fontSize: "0.75rem",
              },
            }}
          />
        </Box>

        <AuthTextField
          name="password"
          label="Senha"
          type={showPassword ? "text" : "password"}
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
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    disableRipple
                    sx={{
                      backgroundColor: "transparent",

                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "0.5rem 0.75rem",
              fontSize: "0.75rem",
            },
          }}
        />

        <SubmitButton
          label="Entrar"
          loading={loading}
          loadingLabel="Entrando..."
        />

        <AuthError error={apiError} />

        <Typography
          variant="body2"
          textAlign="center"
          sx={(theme) => ({
            pt: 0.5,
            fontSize: "1rem",
            color: theme.palette.text.secondary,
          })}
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
