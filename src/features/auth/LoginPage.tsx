import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import type { LoginDto, CreateAccountDto, IdentifierMode } from "./types";
import { loginThunk, registerThunk } from "./authThunks";

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

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      console.log("LOGIN", {
        isLogin,
        identifierMode,
        loginData,
      });

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
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nome completo"
              disabled={loading}
              value={registerData.name}
              onChange={handleRegisterChange}
            />
            <label htmlFor="userName">Nome de Usuário</label>
            <input
              id="userName"
              name="userName"
              type="text"
              placeholder="Nome de usuário"
              disabled={loading}
              value={registerData.userName}
              onChange={handleRegisterChange}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              disabled={loading}
              value={registerData.email}
              onChange={handleRegisterChange}
            />
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Senha"
              disabled={loading}
              value={registerData.password}
              onChange={handleRegisterChange}
            />
            <label htmlFor="imageUrl">URL da foto de perfil (opcional)</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="URL da foto de perfil (opcional)"
              disabled={loading}
              value={registerData.imageUrl}
              onChange={handleRegisterChange}
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
        <button type="submit" disabled={loading}>
          {loading
            ? isLogin
              ? "Entrando..."
              : "Criando conta..."
            : isLogin
              ? "Entrar"
              : "Criar Conta"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <p onClick={toggleMode} style={{ cursor: "pointer", color: "blue" }}>
        {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
      </p>
    </main>
  );
}
