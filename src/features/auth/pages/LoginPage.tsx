import { Alert, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { loginThunk, registerThunk } from "../../auth/store/authThunks";
import { LoginForm } from "../components/LoginForm";
import { LoginTextContent } from "../components/LoginTextContent";
import { RegisterForm } from "../components/RegisterForm";
import { RegisterTextContent } from "../components/RegisterTextContent";
import { AuthLayout } from "../layouts/AuthLayout";
import type { CreateAccountDto, LoginDto } from "../types";
import { SessionExpiredDialog } from "../../../components/SessionExpiredDialog";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const sessionExpired = searchParams.get("expired") === "true";

  const handleCloseDialog = () => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete("expired");

    setSearchParams(nextParams, {
      replace: true,
    });
  };

  const handleRegister = async (data: CreateAccountDto) => {
    try {
      await dispatch(registerThunk(data)).unwrap();

      setRegisterSuccess(true);

      setIsLogin(true);
    } catch {
      // redux já trata erro
    }
  };

  const handleLogin = async (data: LoginDto) => {
    try {
      setRegisterSuccess(false);

      await dispatch(loginThunk(data)).unwrap();

      navigate("/app");
    } catch {
      // redux já trata erro
    }
  };

  const toggleMode = () => {
    setRegisterSuccess(false);

    setIsLogin((prev) => !prev);
  };

  const content = isLogin
    ? {
        left: <LoginTextContent />,
        right: (
          <LoginForm
            loading={loading}
            error={error}
            onSubmit={handleLogin}
            onSwitchMode={toggleMode}
            onInteraction={() => {
              if (registerSuccess) {
                setRegisterSuccess(false);
              }
            }}
          />
        ),
      }
    : {
        left: (
          <RegisterForm
            loading={loading}
            error={error}
            onSubmit={handleRegister}
            onSwitchMode={toggleMode}
          />
        ),
        right: <RegisterTextContent />,
      };

  return (
    <>
      <SessionExpiredDialog open={sessionExpired} onClose={handleCloseDialog} />

      <Box
        component="main"
        sx={(theme) => ({
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, sm: 4 },
          bgcolor: theme.custom.layout.outer,
        })}
      >
        <Box
          key={isLogin ? "login" : "register"}
          sx={{
            "@keyframes fadeSlide": {
              from: {
                opacity: 0,
                transform: `translateX(${isLogin ? "12px" : "-12px"})`,
              },
              to: {
                opacity: 1,
                transform: "translateX(0)",
              },
            },
            animation: "fadeSlide 240ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {registerSuccess && isLogin && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Conta criada com sucesso. Faça login.
            </Alert>
          )}
          <AuthLayout left={content.left} right={content.right} />
        </Box>
      </Box>
    </>
  );
}
