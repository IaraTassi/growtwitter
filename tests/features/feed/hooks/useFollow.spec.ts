import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  followUser,
  unfollowUser,
} from "../../../../src/features/feed/services/followService";
import { act, renderHook } from "@testing-library/react";
import { useFollow } from "../../../../src/features/feed/hooks/useFollow";
import { SessionExpiredError } from "../../../../src/features/feed/services/errors/SessionExpiredError";

vi.mock("../../../../src/features/feed/services/followService", () => ({
  followUser: vi.fn(),
  unfollowUser: vi.fn(),
}));

describe("useFollow", () => {
  const mockedFollowUser = vi.mocked(followUser);
  const mockedUnfollowUser = vi.mocked(unfollowUser);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call followUser when user is not followed", async () => {
    const { result } = renderHook(() => useFollow("token"));

    const onSuccess = vi.fn();

    mockedFollowUser.mockResolvedValue(undefined);

    await act(async () => {
      await result.current.toggleFollow("1", false, onSuccess);
    });

    expect(mockedFollowUser).toHaveBeenCalledWith("token", "1");
    expect(onSuccess).toHaveBeenCalled();
  });

  it("should call unfollowUser when user is already followed", async () => {
    const { result } = renderHook(() => useFollow("token"));

    const onSuccess = vi.fn();

    mockedUnfollowUser.mockResolvedValue(undefined);

    await act(async () => {
      await result.current.toggleFollow("1", true, onSuccess);
    });

    expect(mockedUnfollowUser).toHaveBeenCalledWith("token", "1");
    expect(onSuccess).toHaveBeenCalled();
  });

  it("should add userId to loadingIds while request is in progress", async () => {
    const { result } = renderHook(() => useFollow("token"));

    const onSuccess = vi.fn();

    let resolvePromise!: () => void;

    mockedFollowUser.mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        }),
    );

    act(() => {
      result.current.toggleFollow("1", false, onSuccess);
    });

    expect(result.current.loadingIds).toContain("1");

    await act(async () => {
      resolvePromise();
    });
  });

  it("should remove userId from loadingIds after request finishes", async () => {
    const { result } = renderHook(() => useFollow("token"));

    const onSuccess = vi.fn();

    mockedFollowUser.mockResolvedValue(undefined);

    await act(async () => {
      await result.current.toggleFollow("1", false, onSuccess);
    });

    expect(result.current.loadingIds).not.toContain("1");
  });

  it("should handle errors gracefully and remove loadingId", async () => {
    const { result } = renderHook(() => useFollow("token"));

    const onSuccess = vi.fn();

    mockedFollowUser.mockRejectedValue(new Error("fail"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await act(async () => {
      await result.current.toggleFollow("1", false, onSuccess);
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    expect(result.current.loadingIds).not.toContain("1");

    consoleSpy.mockRestore();
  });

  it("should support multiple concurrent loadingIds", async () => {
    const { result } = renderHook(() => useFollow("token"));

    let resolve1!: () => void;
    let resolve2!: () => void;

    mockedFollowUser
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolve1 = resolve;
          }),
      )
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            resolve2 = resolve;
          }),
      );

    act(() => {
      result.current.toggleFollow("1", false, vi.fn());
      result.current.toggleFollow("2", false, vi.fn());
    });

    expect(result.current.loadingIds).toEqual(
      expect.arrayContaining(["1", "2"]),
    );

    await act(async () => {
      resolve1();
      resolve2();
    });

    expect(result.current.loadingIds).toEqual([]);
  });

  it("should ignore SessionExpiredError and clear loading state", async () => {
    const { result } = renderHook(() => useFollow("token"));

    const onSuccess = vi.fn();

    mockedFollowUser.mockRejectedValue(new SessionExpiredError());

    await act(async () => {
      await result.current.toggleFollow("1", false, onSuccess);
    });

    expect(onSuccess).not.toHaveBeenCalled();
    expect(result.current.loadingIds).not.toContain("1");
  });
});
