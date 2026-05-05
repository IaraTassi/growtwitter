import { useSelector } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProfileTweets } from "../../../../src/features/feed/services/profileService";
import type { RootState } from "../../../../src/store/store";
import type { ProfileTweetResponseDto } from "../../../../src/features/feed/types";
import { renderHook, waitFor } from "@testing-library/react";
import { useProfileTweets } from "../../../../src/features/feed/hooks/useProfileTweets";

vi.mock("../../../../src/features/feed/services/profileService", () => ({
  getProfileTweets: vi.fn(),
}));

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

const mockedUseSelector = vi.mocked(useSelector);
const mockedGetProfileTweets = vi.mocked(getProfileTweets);

const mockState = (token: string | null): Partial<RootState> =>
  ({
    auth: { token },
  }) as Partial<RootState>;

describe("useProfileTweets", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load tweets when token exists", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn(mockState("token-123") as RootState),
    );

    const mockData: ProfileTweetResponseDto[] = [
      { id: "1" } as ProfileTweetResponseDto,
    ];

    mockedGetProfileTweets.mockResolvedValue(mockData);

    const { result } = renderHook(() => useProfileTweets("user-1"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(mockedGetProfileTweets).toHaveBeenCalledWith("user-1", "token-123");

    expect(result.current.error).toBeNull();
  });

  it("should not call service when token is missing", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn(mockState(null) as RootState),
    );
    const { result } = renderHook(() => useProfileTweets("user-1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    expect(mockedGetProfileTweets).not.toHaveBeenCalled();
  });

  it("should handle error correctly", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn(mockState("token-123") as RootState),
    );

    mockedGetProfileTweets.mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useProfileTweets("user-1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Erro ao carregar tweets");
  });
});
