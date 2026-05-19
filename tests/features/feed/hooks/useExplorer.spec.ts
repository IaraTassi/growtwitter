import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UserWithRelations } from "../../../../src/features/feed/types";
import { getUsers } from "../../../../src/features/feed/services/userService";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useExplorer } from "../../../../src/features/feed/hooks/useExplorer";
import { SessionExpiredError } from "../../../../src/features/feed/services/errors/SessionExpiredError";

const toggleFollowMock = vi.fn();

vi.mock("../../../../src/features/feed/services/userService", () => ({
  getUsers: vi.fn(),
}));

vi.mock("../../../../src/features/feed/hooks/useFollow", () => ({
  useFollow: () => ({
    toggleFollow: toggleFollowMock,
    loadingIds: [],
  }),
}));

const mockUsers: UserWithRelations[] = [
  {
    id: "1",
    name: "User 1",
    userName: "user1",
    email: "",
    createdAt: "2026-02-19T10:00:00Z",
    updatedAt: "2026-02-19T10:00:00Z",
    following: [{ followingId: "2", followerId: "1", createdAt: "" }],
    followers: [],
    followersCount: 0,
    followingCount: 1,
  },
  {
    id: "2",
    name: "User 2",
    userName: "user2",
    email: "",
    createdAt: "2026-02-19T10:00:00Z",
    updatedAt: "2026-02-19T10:00:00Z",
    following: [],
    followers: [{ followerId: "1", followingId: "2", createdAt: "" }],
    followersCount: 1,
    followingCount: 0,
  },
  {
    id: "3",
    name: "User 3",
    userName: "user3",
    email: "",
    createdAt: "2026-02-19T10:00:00Z",
    updatedAt: "2026-02-19T10:00:00Z",
    following: [],
    followers: [],
    followersCount: 0,
    followingCount: 0,
  },
];

describe("useExplorer", () => {
  const mockedGetUsers = vi.mocked(getUsers);

  beforeEach(() => {
    vi.clearAllMocks();
    mockedGetUsers.mockResolvedValue(mockUsers);
  });

  it("should load users and update loading state", async () => {
    const { result } = renderHook(() =>
      useExplorer({ token: "token", currentUserId: "1" }),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(getUsers).toHaveBeenCalledWith("token");
  });

  it("should exclude current user from results", async () => {
    const { result } = renderHook(() =>
      useExplorer({ token: "token", currentUserId: "1" }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const ids = result.current.users.map((u) => u.id);

    expect(ids).not.toContain("1");
  });

  it("should mark following users correctly", async () => {
    const { result } = renderHook(() =>
      useExplorer({ token: "token", currentUserId: "1" }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const user2 = result.current.users.find((u) => u.id === "2");

    expect(user2).toBeUndefined();
  });

  it("should return only suggested users (not followed)", async () => {
    const { result } = renderHook(() =>
      useExplorer({ token: "token", currentUserId: "1" }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const ids = result.current.users.map((u) => u.id);

    expect(ids).toEqual(["3"]);
  });

  it("should respect pagination limit", async () => {
    const { result } = renderHook(() =>
      useExplorer({ token: "token", currentUserId: "1" }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users.length).toBeLessThanOrEqual(5);
  });

  it("should increase visible users when loadMore is called", async () => {
    const { result } = renderHook(() =>
      useExplorer({ token: "token", currentUserId: "1" }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.users.length).toBeLessThanOrEqual(10);
  });

  it("should toggle follow and update state", async () => {
    const { result } = renderHook(() =>
      useExplorer({ token: "token", currentUserId: "1" }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.handleToggleFollow("3");
    });

    expect(toggleFollowMock).toHaveBeenCalledWith(
      "3",
      false,
      expect.any(Function),
    );
  });

  it("should not call toggleFollow if user does not exist", async () => {
    const { result } = renderHook(() =>
      useExplorer({ token: "token", currentUserId: "1" }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.handleToggleFollow("999");
    });

    expect(toggleFollowMock).not.toHaveBeenCalled();
  });

  it("should handle SessionExpiredError and not update users", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockedGetUsers.mockRejectedValue(new SessionExpiredError());

    const { result } = renderHook(() =>
      useExplorer({ token: "token", currentUserId: "1" }),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([]);
    expect(mockedGetUsers).toHaveBeenCalledWith("token");

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
