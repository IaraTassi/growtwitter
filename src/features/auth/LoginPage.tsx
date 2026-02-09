import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import type { LoginDto, CreateAccountDto } from "./types";
import { loginThunk, registerThunk } from "./authThunks";
import { RegisterForm } from "../../../src/features/auth/components/RegisterForm";
import { LoginForm } from "./components/LoginForm";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(false);

  function handleRegister(data: CreateAccountDto) {
    dispatch(registerThunk(data));
  }

  const handleLogin = (data: LoginDto) => {
    dispatch(loginThunk(data));
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <main className="login-page">
      {isLogin ? (
        <LoginForm loading={loading} error={error} onSubmit={handleLogin} />
      ) : (
        <RegisterForm
          loading={loading}
          error={error}
          onSubmit={handleRegister}
        />
      )}

      <p onClick={toggleMode} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
      </p>
    </main>
  );
}
