import { describe, expect, it } from "vitest";
import type { ProfileReplyResponseDto } from "../../../../src/features/feed/types";
import {
  filterReplyRoots,
  hasRepliesDeep,
} from "../../../../src/features/feed/utils/profile.utils";

function createMockReply(
  overrides?: Partial<ProfileReplyResponseDto>,
): ProfileReplyResponseDto {
  const base: ProfileReplyResponseDto = {
    id: "1",
    content: "Reply",
    createdAt: "",
    replies: [],
    user: {
      id: "user1",
      name: "User 1",
      userName: "user1",
      imageUrl: "",
    },
  };

  return {
    ...base,
    ...overrides,
    user: {
      ...base.user,
      ...overrides?.user,
    },
  };
}

describe("profileUtils", () => {
  describe("profileUtils - hasRepliesDeep", () => {
    it("should return true when node has replies", () => {
      const reply = createMockReply();
      const node = createMockReply({ replies: [reply] });

      expect(hasRepliesDeep(node)).toBe(true);
    });

    it("should return false when node has no replies", () => {
      const node = createMockReply({ replies: [] });

      expect(hasRepliesDeep(node)).toBe(false);
    });

    it("should return false when replies is undefined", () => {
      const node = createMockReply({ replies: [] });
      expect(hasRepliesDeep(node)).toBe(false);
    });
  });

  describe("profileUtils - filterReplyRoots", () => {
    it("should keep only replies that have children", () => {
      const child = createMockReply();
      const withChildren = createMockReply({ id: "1", replies: [child] });
      const withoutChildren = createMockReply({ id: "2", replies: [] });

      const result = filterReplyRoots([withChildren, withoutChildren]);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe("1");
    });

    it("should return empty array when none have replies", () => {
      const r1 = createMockReply({ replies: [] });
      const r2 = createMockReply({ replies: [] });

      const result = filterReplyRoots([r1, r2]);

      expect(result.length).toBe(0);
    });

    it("should return all when all have replies", () => {
      const r1 = createMockReply({ replies: [createMockReply()] });
      const r2 = createMockReply({ replies: [createMockReply()] });

      const result = filterReplyRoots([r1, r2]);

      expect(result.length).toBe(2);
    });
  });
});
