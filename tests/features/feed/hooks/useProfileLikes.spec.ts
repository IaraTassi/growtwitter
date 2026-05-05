import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProfileLikes } from "../../../../src/features/feed/services/profileService";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../src/store/store";
import type { ProfileLikedTweetResponseDto } from "../../../../src/features/feed/types";
import { renderHook, waitFor } from "@testing-library/react";
import { useProfileLikes } from "../../../../src/features/feed/hooks/useProfileLikes";

vi.mock("../../../../src/features/feed/services/profileService", () => ({
  getProfileLikes: vi.fn(),
}));

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

const mockedGetProfileLikes = vi.mocked(getProfileLikes);
const mockedUseSelector = vi.mocked(useSelector);

const mockState = (token: string | null): Partial<RootState> =>
  ({
    auth: { token },
  }) as Partial<RootState>;

describe("useProfileLikes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return loading initially and then data", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn(mockState("token-123") as RootState),
    );

    const mockData: ProfileLikedTweetResponseDto[] = [
      { id: "1" } as ProfileLikedTweetResponseDto,
    ];

    mockedGetProfileLikes.mockResolvedValue(mockData);

    const { result } = renderHook(() => useProfileLikes("user-1"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(getProfileLikes).toHaveBeenCalledWith("user-1", "token-123");
  });

  it("should not call service if token is missing", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn(mockState(null) as RootState),
    );
    const { result } = renderHook(() => useProfileLikes("user-1"));
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(mockedGetProfileLikes).not.toHaveBeenCalled();
    });
  });
});
