export type CreateAccountDto = {
  name: string;
  userName: string;
  email: string;
  password: string;
  imageUrl?: string;
};

export type LoginDto = {
  identifier: string;
  password: string;
};

export type AuthUser = {
  id: string;
  name: string;
  userName: string;
  email: string;
  imageUrl?: string;
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

export type CreateAccountResponse = {
  ok: boolean;
  message: string;
  user: AuthUser;
};

export type LoginResponse = {
  ok: boolean;
  message: string;
  token: string;
  user: AuthUser;
};

export type ApiError = {
  message: string;
};

export type IdentifierMode = "email" | "username";

export type RegisterFormProps = {
  loading: boolean;
  error?: string | null;
  onSubmit: (data: CreateAccountDto) => void;
};
