import type { AuthLayoutProps } from "../types";

export function AuthLayout({ left, right }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <section className="auth-layout__left">{left}</section>
      <section className="auth-layout__right">{right}</section>
    </div>
  );
}
