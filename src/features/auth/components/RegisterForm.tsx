import type { RegisterFormProps, CreateAccountDto } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { AuthError } from "./AuthError";

export function RegisterForm({
  loading,
  error,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(registerData);
  };

  return (
    <>
      <h2>Criar conta</h2>

      <form
        onSubmit={handleSubmit}
        aria-busy={loading || undefined}
        data-testid="register-form"
      >
        <label htmlFor="name">Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nome completo"
          disabled={loading}
          required
          value={registerData.name}
          onChange={handleChange}
        />

        <label htmlFor="userName">Nome de usuário</label>
        <input
          id="userName"
          name="userName"
          type="text"
          placeholder="Nome de usuário"
          disabled={loading}
          required
          value={registerData.userName}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          disabled={loading}
          required
          value={registerData.email}
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
          value={registerData.password}
          onChange={handleChange}
        />

        <label htmlFor="imageUrl">URL da Foto de perfil (opcional)</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="URL da foto de perfil (opcional)"
          disabled={loading}
          value={registerData.imageUrl}
          onChange={handleChange}
        />

        <SubmitButton
          label={loading ? "Criando..." : "Criar conta"}
          disabled={loading}
        />

        <AuthError error={error} />

        <p>
          Já tem conta?{" "}
          <span role="button" onClick={onSwitchMode}>
            Entrar
          </span>
        </p>
      </form>
    </>
  );
}
