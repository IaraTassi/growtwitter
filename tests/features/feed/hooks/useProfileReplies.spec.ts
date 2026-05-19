import { useSelector } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProfileReplies } from "../../../../src/features/feed/services/profileService";
import type { RootState } from "../../../../src/store/store";
import type { ProfileReplyResponseDto } from "../../../../src/features/feed/types";
import { renderHook, waitFor } from "@testing-library/react";
import { useProfileReplies } from "../../../../src/features/feed/hooks/useProfileReplies";
import { SessionExpiredError } from "../../../../src/features/feed/services/errors/SessionExpiredError";

vi.mock("../../../../src/features/feed/services/profileService", () => ({
  getProfileReplies: vi.fn(),
}));

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

const mockedUseSelector = vi.mocked(useSelector);
const mockedGetProfileReplies = vi.mocked(getProfileReplies);

const mockState = (token: string | null): Partial<RootState> =>
  ({
    auth: { token },
  }) as Partial<RootState>;

describe("useProfileReplies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load data when token exists", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn(mockState("token-123") as RootState),
    );

    const mockData: ProfileReplyResponseDto[] = [
      { id: "1" } as ProfileReplyResponseDto,
    ];

    mockedGetProfileReplies.mockResolvedValue(mockData);

    const { result } = renderHook(() => useProfileReplies("user-1"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(mockedGetProfileReplies).toHaveBeenCalledWith("user-1", "token-123");
  });

  it("should not call service when token is missing", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn(mockState(null) as RootState),
    );
    const { result } = renderHook(() => useProfileReplies("user-1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    expect(mockedGetProfileReplies).not.toHaveBeenCalled();
  });

  it("should ignore SessionExpiredError", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn(mockState("token-123") as RootState),
    );

    mockedGetProfileReplies.mockRejectedValue(new SessionExpiredError());

    const { result } = renderHook(() => useProfileReplies("user-1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual([]);
  });
});
