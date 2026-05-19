export class SessionExpiredError extends Error {
  constructor() {
    super("Sessão expirada");
    this.name = "SessionExpiredError";
  }
}
