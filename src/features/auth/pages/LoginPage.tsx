import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { loginThunk, registerThunk } from "../../auth/store/authThunks";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import type { CreateAccountDto, LoginDto } from "../types";
import { LoginTextContent } from "../components/LoginTextContent";
import { RegisterTextContent } from "../components/RegisterTextContent";
import { Box } from "@mui/material";
import { COLORS } from "../../../theme/colors";
import { AuthLayout } from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleRegister = (data: CreateAccountDto) =>
    dispatch(registerThunk(data));

  const handleLogin = async (data: LoginDto) => {
    await dispatch(loginThunk(data)).unwrap();
    navigate("/app");
  };

  const toggleMode = () => setIsLogin((prev) => !prev);

  const content = isLogin
    ? {
        left: <LoginTextContent />,
        right: (
          <LoginForm
            loading={loading}
            error={error}
            onSubmit={handleLogin}
            onSwitchMode={toggleMode}
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
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: COLORS.modalBackground,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 3, sm: 4 },
      }}
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
        <AuthLayout left={content.left} right={content.right} />
      </Box>
    </Box>
  );
}
