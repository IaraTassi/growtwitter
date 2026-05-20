import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useSessionManager } from "../../src/hooks/useSessionManager";
import { logout } from "../../src/features/auth/store/authSlice";

const jwtDecodeMock = vi.hoisted(() => vi.fn());
const mockNavigate = vi.hoisted(() => vi.fn());
const mockDispatch = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("react-redux", async () => {
  const actual =
    await vi.importActual<typeof import("react-redux")>("react-redux");

  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: () => mockDispatch,
  };
});

vi.mock("../../../src/hooks/redux", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("jwt-decode", () => ({
  jwtDecode: jwtDecodeMock,
}));

type TestRootState = {
  auth: {
    token: string | null;
  };
};

type JwtPayload = {
  exp: number;
};

const createState = (token: string | null): TestRootState => ({
  auth: { token },
});

const mockedUseSelector = vi.mocked(useSelector<TestRootState>);

describe("useSessionManager", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should not navigate when token is null", () => {
    mockedUseSelector.mockImplementation((fn) => fn(createState(null)));

    renderHook(() => useSessionManager());

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("should logout immediately when token is expired", () => {
    mockedUseSelector.mockImplementation((fn) => fn(createState("token")));

    jwtDecodeMock.mockReturnValue({
      exp: Date.now() / 1000 - 10,
    } satisfies JwtPayload);

    renderHook(() => useSessionManager());

    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(mockNavigate).toHaveBeenCalledWith(
      "/login?expired=true",
      expect.any(Object),
    );
  });

  it("should schedule logout when token is valid", () => {
    mockedUseSelector.mockImplementation((fn) => fn(createState("token")));

    jwtDecodeMock.mockReturnValue({
      exp: Date.now() / 1000 + 60,
    } satisfies JwtPayload);

    renderHook(() => useSessionManager());

    vi.advanceTimersByTime(60_000);

    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });

  it("should trigger logout on visibility change", () => {
    mockedUseSelector.mockImplementation((fn) => fn(createState("token")));

    jwtDecodeMock.mockReturnValue({
      exp: Date.now() / 1000 - 1,
    } satisfies JwtPayload);

    renderHook(() => useSessionManager());

    document.dispatchEvent(new Event("visibilitychange"));

    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });

  it("should cleanup timers on unmount", () => {
    const clearSpy = vi.spyOn(globalThis, "clearTimeout");

    mockedUseSelector.mockImplementation((fn) => fn(createState("token")));

    jwtDecodeMock.mockReturnValue({
      exp: Date.now() / 1000 + 100,
    } satisfies JwtPayload);

    const { unmount } = renderHook(() => useSessionManager());

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });

  it("should logout when jwtDecode throws error", () => {
    mockedUseSelector.mockImplementation((selector) =>
      selector(createState("token")),
    );

    jwtDecodeMock.mockImplementation(() => {
      throw new Error("invalid token");
    });

    renderHook(() => useSessionManager());

    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });

  it("should prevent multiple logout calls", () => {
    const past = Date.now() / 1000 - 1;

    mockedUseSelector.mockImplementation((selector) =>
      selector(createState("token")),
    );

    jwtDecodeMock.mockReturnValue({
      exp: past,
    });

    const { unmount: unmount1 } = renderHook(() => useSessionManager());
    const { unmount: unmount2 } = renderHook(() => useSessionManager());

    unmount1();
    unmount2();

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
