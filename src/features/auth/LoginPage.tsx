import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import type { LoginDto, CreateAccountDto, IdentifierMode } from "./types";
import { loginThunk, registerThunk } from "./authThunks";
import { RegisterForm } from "../../../src/features/auth/components/RegisterForm";
import { SubmitButton } from "./components/SubmitButton";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [registerData, setRegisterData] = useState<CreateAccountDto>({
    name: "",
    userName: "",
    email: "",
    password: "",
    imageUrl: "",
  });
  const [loginData, setLoginData] = useState<LoginDto>({
    identifier: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const [identifierMode, setIdentifierMode] = useState<IdentifierMode>("email");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleRegister(data: CreateAccountDto) {
    dispatch(registerThunk(data));
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginThunk(loginData));
    } else {
      dispatch(registerThunk(registerData));
    }
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);

    setIdentifierMode("email");

    setLoginData({ identifier: "", password: "" });
    setRegisterData({
      name: "",
      userName: "",
      email: "",
      password: "",
      imageUrl: "",
    });
  };

  return (
    <main className="login-page">
      <h2>{isLogin ? "Login" : "Criar Conta"}</h2>
      <form onSubmit={handleSubmit} aria-busy={loading}>
        {!isLogin && (
          <>
            <RegisterForm
              loading={loading}
              error={error}
              onSubmit={handleRegister}
            />
          </>
        )}

        {isLogin && (
          <>
            {identifierMode === "email" ? (
              <>
                <label htmlFor="identifier">Email</label>
                <input
                  id="identifier"
                  name="identifier"
                  type="email"
                  placeholder="Email"
                  disabled={loading}
                  value={loginData.identifier}
                  onChange={handleLoginChange}
                />
              </>
            ) : (
              <>
                <label htmlFor="identifier">Nome de usuário</label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="Nome de usuário"
                  disabled={loading}
                  value={loginData.identifier}
                  onChange={handleLoginChange}
                />
              </>
            )}

            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Senha"
              disabled={loading}
              value={loginData.password}
              onChange={handleLoginChange}
            />

            <button
              type="button"
              className="toggle-identifier"
              disabled={loading}
              onClick={() =>
                setIdentifierMode((prev) =>
                  prev === "email" ? "username" : "email",
                )
              }
            >
              Usar {identifierMode === "email" ? "nome de usuário" : "email"}
            </button>
          </>
        )}
        <SubmitButton
          label={
            loading
              ? isLogin
                ? "Entrando..."
                : "Criando conta..."
              : isLogin
                ? "Entrar"
                : "Criar Conta"
          }
          disabled={loading}
        />
      </form>

      {error && <p className="error">{error}</p>}

      <p onClick={toggleMode} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
      </p>
    </main>
  );
}
