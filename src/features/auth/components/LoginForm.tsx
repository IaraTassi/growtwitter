import type { LoginFormProps, LoginDto, IdentifierMode } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(loginData);
  };

  const isEmail = identifierMode === "email";

  return (
    <>
      <h2>Entrar no Growtwitter</h2>

      <form
        onSubmit={handleSubmit}
        aria-busy={loading || undefined}
        data-testid="login-form"
      >
        <label htmlFor="identifier">
          {identifierMode === "email" ? "Email" : "Nome de usuário"}
        </label>
        <input
          id="identifier"
          name="identifier"
          type={isEmail ? "email" : "text"}
          placeholder={isEmail ? "Email" : "Nome de usuário"}
          disabled={loading}
          required
          value={loginData.identifier}
          onChange={handleChange}
        />

        <p>
          <span
            role="button"
            tabIndex={0}
            onClick={() => setIdentifierMode(isEmail ? "username" : "email")}
          >
            {isEmail ? "Usar nome de usuário" : "Usar email"}
          </span>
        </p>

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          disabled={loading}
          required
          value={loginData.password}
          onChange={handleChange}
        />

        <SubmitButton
          label={loading ? "Entrando..." : "Entrar"}
          disabled={loading}
        />

        <AuthError error={error} />

        <p>
          Não tem conta?{" "}
          <span role="button" onClick={onSwitchMode}>
            Criar agora
          </span>
        </p>
      </form>
    </>
  );
}
