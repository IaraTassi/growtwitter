import type { AuthUser } from "../types";

export const saveAuth = (token: string, user: AuthUser) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const loadAuth = () => {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return {
      token: token ?? null,
      user: user ? JSON.parse(user) : null,
    };
  } catch {
    return { token: null, user: null };
  }
};
