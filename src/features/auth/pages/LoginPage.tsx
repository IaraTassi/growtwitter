import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { loginThunk, registerThunk } from "../../auth/store/authThunks";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import type { CreateAccountDto, LoginDto } from "../types";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = (data: CreateAccountDto) =>
    dispatch(registerThunk(data));
  const handleLogin = (data: LoginDto) => dispatch(loginThunk(data));
  const toggleMode = () => setIsLogin((prev) => !prev);

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
