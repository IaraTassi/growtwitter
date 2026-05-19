import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ProfileUser } from "../../../../src/features/feed/types";
import { act, renderHook } from "@testing-library/react";
import { useFollowUser } from "../../../../src/features/feed/hooks/useProfileFollowUser";

const toggleFollowMock = vi.fn();

vi.mock("../../../../src/features/feed/hooks/useFollow", () => ({
  useFollow: vi.fn(() => ({
    toggleFollow: toggleFollowMock,
  })),
}));

vi.mock("react-redux", async () => {
  const actual =
    await vi.importActual<typeof import("react-redux")>("react-redux");

  return {
    ...actual,
    useSelector: vi.fn((selector) =>
      selector({
        auth: {
          user: {
            id: "logged-user",
          },
        },
      }),
    ),
  };
});

const mockUser: ProfileUser = {
  id: "1",
  name: "Test User",
  userName: "test",
  email: "",
  createdAt: "2026-02-19T10:00:00Z",
  updatedAt: "2026-02-19T10:00:00Z",
  followers: [],
  followersCount: 10,
  followingCount: 0,
  isFollowing: false,
};

describe("useFollowUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return initial state from user", () => {
    const { result } = renderHook(() => useFollowUser(mockUser, "token"));

    expect(result.current.isFollowing).toBe(false);
    expect(result.current.followersCount).toBe(10);
  });

  it("should call toggleFollow when handleToggleFollow is executed", async () => {
    const { result } = renderHook(() => useFollowUser(mockUser, "token"));

    await act(async () => {
      await result.current.handleToggleFollow();
    });

    expect(toggleFollowMock).toHaveBeenCalledWith(
      "1",
      false,
      expect.any(Function),
    );
  });

  it("should update state to following after toggle", async () => {
    let successCallback: VoidFunction;

    toggleFollowMock.mockImplementation((_id, _isFollowing, cb) => {
      successCallback = cb;
    });

    const { result } = renderHook(() => useFollowUser(mockUser, "token"));

    await act(async () => {
      await result.current.handleToggleFollow();
      successCallback();
    });

    expect(result.current.isFollowing).toBe(true);
    expect(result.current.followersCount).toBe(11);
  });

  it("should decrease followers when unfollowing", async () => {
    let successCallback: VoidFunction;

    toggleFollowMock.mockImplementation((_id, _isFollowing, cb) => {
      successCallback = cb;
    });

    const userFollowing: ProfileUser = {
      ...mockUser,
      followers: [
        {
          followerId: "logged-user",
          followingId: "",
          createdAt: "",
        },
      ],
      followersCount: 10,
    };

    const { result } = renderHook(() => useFollowUser(userFollowing, "token"));

    await act(async () => {
      await result.current.handleToggleFollow();
      successCallback();
    });

    expect(result.current.isFollowing).toBe(false);
    expect(result.current.followersCount).toBe(9);
  });

  it("should not call toggleFollow if user has no id", async () => {
    const userWithoutId = {
      ...mockUser,
      id: "",
    };

    const { result } = renderHook(() => useFollowUser(userWithoutId, "token"));

    await act(async () => {
      await result.current.handleToggleFollow();
    });

    expect(toggleFollowMock).not.toHaveBeenCalled();
  });
});
