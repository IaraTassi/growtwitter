import type { RegisterFormProps, CreateAccountDto } from "../types";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";

export function RegisterForm({ loading, error, onSubmit }: RegisterFormProps) {
  const [registerData, setRegisterData] = useState<CreateAccountDto>({
    name: "",
    userName: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(registerData);
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={loading}>
      <h2>Criar conta</h2>

      <label htmlFor="name">Nome</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Nome completo"
        required
        disabled={loading}
        value={registerData.name}
        onChange={handleChange}
      />

      <label htmlFor="userName">Nome de usuário</label>
      <input
        id="userName"
        name="userName"
        type="text"
        placeholder="Nome de usuário"
        required
        disabled={loading}
        value={registerData.userName}
        onChange={handleChange}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
        disabled={loading}
        value={registerData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Senha</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Senha"
        required
        disabled={loading}
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

      <SubmitButton label="Criar conta" loading={loading} />

      {error && <p className="error">{error}</p>}
    </form>
  );
}
