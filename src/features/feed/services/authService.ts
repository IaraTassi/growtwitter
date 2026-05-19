import { SessionExpiredError } from "./errors/SessionExpiredError";

export async function authFetch(
  url: string,
  options: RequestInit = {},
  token?: string,
) {
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  };

  if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    throw new SessionExpiredError();
  }

  return response;
}
