import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchFeed,
  toggleLikeThunk,
} from "../../../../src/features/feed/store/feedThunks";
import * as feedService from "../../../../src/features/feed/services/feedService";
import * as likeService from "../../../../src/features/feed/services/likeService";
import { FeedTweetResponse } from "../../../../src/features/feed/types";

vi.mock("../../../../src/features/feed/services/feedService");
vi.mock("../../../../src/features/feed/services/likeService");

function createMockFeedResponse(
  overrides?: Partial<FeedTweetResponse>,
): FeedTweetResponse {
  return {
    id: "1",
    content: "Tweet",
    userId: "user1",
    createdAt: "",
    updatedAt: "",
    user: {
      id: "user1",
      name: "User 1",
      userName: "user1",
      createdAt: "",
      updatedAt: "",
    },
    likes: [],
    replies: [],
    parent: null,
    parentId: null,
    ...overrides,
  };
}

describe("feedThunks", () => {
  const mockDispatch = vi.fn();
  const mockGetState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("feedThunks - fetchFeed", () => {
    it("should reject if no token", async () => {
      mockGetState.mockReturnValue({
        auth: { token: null, user: null },
      });

      const result = await fetchFeed()(mockDispatch, mockGetState, undefined);

      expect(result.payload).toBe("Token não encontrado");
    });

    it("should call getFeed and return fulfilled", async () => {
      const mockData: FeedTweetResponse[] = [createMockFeedResponse()];

      mockGetState.mockReturnValue({
        auth: { token: "token123", user: { id: "user1" } },
      });

      const mockedGetFeed = vi.mocked(feedService.getFeed);

      mockedGetFeed.mockResolvedValue(
        mockData as Awaited<ReturnType<typeof feedService.getFeed>>,
      );

      const result = await fetchFeed()(mockDispatch, mockGetState, undefined);

      expect(feedService.getFeed).toHaveBeenCalledWith("token123");
      expect(result.type).toBe("feed/fetchFeed/fulfilled");
    });
  });

  describe("feedThunks - toggleLikeThunk", () => {
    it("should reject if no token", async () => {
      mockGetState.mockReturnValue({
        auth: { token: null },
      });

      const result = await toggleLikeThunk("1")(
        mockDispatch,
        mockGetState,
        undefined,
      );

      expect(result.payload).toBe("Token não encontrado");
    });

    it("should call toggleLike service and return fulfilled", async () => {
      mockGetState.mockReturnValue({
        auth: { token: "token123" },
      });

      vi.mocked(likeService.toggleLike).mockResolvedValue(undefined);

      const result = await toggleLikeThunk("1")(
        mockDispatch,
        mockGetState,
        undefined,
      );

      expect(likeService.toggleLike).toHaveBeenCalledWith("token123", "1");
      expect(result.type).toBe("feed/toggleLike/fulfilled");
      expect(result.payload).toBe("1");
    });
  });
});
