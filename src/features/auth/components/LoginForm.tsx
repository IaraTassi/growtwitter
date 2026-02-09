import type { LoginFormProps, LoginDto, IdentifierMode } from "../types";
import { useState } from "react";
import { IdentifierToggle } from "./IdentifierToggle";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";

export function LoginForm({ loading, error, onSubmit }: LoginFormProps) {
  const [loginData, setLoginData] = useState<LoginDto>({
    identifier: "",
    password: "",
  });
  const [identifierMode, setIdentifierMode] = useState<IdentifierMode>("email");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(loginData);
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={loading} data-testid="login-form">
      <label htmlFor="identifier">
        {identifierMode === "email" ? "Email" : "Nome de usuário"}
      </label>
      <input
        id="identifier"
        name="identifier"
        type={identifierMode === "email" ? "email" : "text"}
        placeholder={identifierMode === "email" ? "Email" : "Nome de usuário"}
        disabled={loading}
        required
        value={loginData.identifier}
        onChange={handleChange}
      />

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

      <IdentifierToggle
        identifierMode={identifierMode}
        onToggle={() =>
          setIdentifierMode((prev) => (prev === "email" ? "username" : "email"))
        }
        disabled={loading}
      />

      <SubmitButton
        label={loading ? "Entrando..." : "Entrar"}
        disabled={loading}
      />

      <AuthError error={error} />
    </form>
  );
}
