import { describe, expect, it } from "vitest";
import { mapUser } from "../../../../src/features/feed/mappers/userMapper";

import { UserWithRelations } from "../../../../src/features/feed/types";

function createMockUser(
  overrides?: Partial<UserWithRelations>,
): UserWithRelations {
  return {
    id: "u1",
    name: "User Teste",
    userName: "teste",
    imageUrl: "",
    email: "",
    createdAt: "2026-02-19T10:00:00Z",
    updatedAt: "2026-02-19T10:00:00Z",
    ...overrides,
  };
}

describe("userMapper", () => {
  describe("mapUser", () => {
    it("should map user with default counts when missing", () => {
      const user = createMockUser({
        followers: [{ followerId: "2", followingId: "1", createdAt: "" }],
        following: [],
      });

      const result = mapUser(user);

      expect(result.followersCount).toBe(1);
      expect(result.followingCount).toBe(0);
    });

    it("should respect explicit followersCount when provided", () => {
      const user = createMockUser({
        followersCount: 10,
        followers: [{ followerId: "2", followingId: "1", createdAt: "" }],
      });

      const result = mapUser(user);

      expect(result.followersCount).toBe(10);
    });

    it("should respect explicit followingCount when provided", () => {
      const user = createMockUser({
        followingCount: 5,
        following: [{ followingId: "2", followerId: "1", createdAt: "" }],
      });

      const result = mapUser(user);

      expect(result.followingCount).toBe(5);
    });

    it("should return isFollowing true when logged user is follower", () => {
      const user = createMockUser({
        followers: [
          { followerId: "logged-1", followingId: "1", createdAt: "" },
        ],
      });

      const result = mapUser(user, "logged-1");

      expect(result.isFollowing).toBe(true);
    });

    it("should return isFollowing false when logged user is not follower", () => {
      const user = createMockUser({
        followers: [{ followerId: "other", followingId: "1", createdAt: "" }],
      });

      const result = mapUser(user, "logged-1");

      expect(result.isFollowing).toBe(false);
    });

    it("should return isFollowing false when no loggedUserId", () => {
      const user = createMockUser({
        followers: [{ followerId: "1", followingId: "2", createdAt: "" }],
      });

      const result = mapUser(user);

      expect(result.isFollowing).toBe(false);
    });

    it("should fallback followersCount to array length when undefined", () => {
      const user = createMockUser({
        followersCount: undefined,
        followers: [
          { followerId: "1", followingId: "2", createdAt: "" },
          { followerId: "2", followingId: "1", createdAt: "" },
        ],
      });

      const result = mapUser(user);

      expect(result.followersCount).toBe(2);
    });

    it("should fallback followingCount to array length when undefined", () => {
      const user = createMockUser({
        followingCount: undefined,
        following: [
          { followerId: "1", followingId: "2", createdAt: "" },
          { followerId: "1", followingId: "3", createdAt: "" },
        ],
      });

      const result = mapUser(user);

      expect(result.followingCount).toBe(2);
    });
  });
});
