import { describe, it, expect, vi, beforeEach } from "vitest";
import { authFetch } from "../../../../src/features/feed/services/authService";
import { SessionExpiredError } from "../../../../src/features/feed/services/errors/SessionExpiredError";

describe("authFetch", () => {
  const BASE_URL = "https://api.test.com/test";

  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("should call fetch with Authorization header when token is provided", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      status: 200,
      ok: true,
    } as Response);

    await authFetch(BASE_URL, { method: "GET" }, "fake-token");

    expect(fetch).toHaveBeenCalledWith(
      BASE_URL,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer fake-token",
        }),
      }),
    );
  });

  it("should throw SessionExpiredError on 401", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      status: 401,
      ok: false,
    } as Response);

    await expect(
      authFetch(BASE_URL, { method: "GET" }, "fake-token"),
    ).rejects.toBeInstanceOf(SessionExpiredError);
  });

  it("should return response when not 401", async () => {
    const mockResponse = {
      status: 200,
      ok: true,
    } as Response;

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(mockResponse);

    const response = await authFetch(BASE_URL, { method: "GET" });

    expect(response).toBe(mockResponse);
  });
});
