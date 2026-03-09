import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createReplyThunk,
  createTweetThunk,
  fetchFeed,
  toggleLikeThunk,
} from "../../../../src/features/feed/store/feedThunks";
import * as feedService from "../../../../src/features/feed/services/feedService";
import * as likeService from "../../../../src/features/feed/services/likeService";
import { FeedTweetResponse } from "../../../../src/features/feed/types";
import * as replyService from "../../../../src/features/feed/services/replyService";
import { mapFeedTweet } from "../../../../src/features/feed/mappers/feedMapper";
import * as tweetService from "../../../../src/features/feed/services/tweetService";

vi.mock("../../../../src/features/feed/services/feedService");
vi.mock("../../../../src/features/feed/services/likeService");
vi.mock("../../../../src/features/feed/services/replyService");
vi.mock("../../../../src/features/feed/services/tweetService");

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
      email: "",
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

  describe("feedThunks - createReplyThunk", () => {
    const mockDispatch = vi.fn();
    const mockGetState = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should reject if no token", async () => {
      mockGetState.mockReturnValue({
        auth: { token: null, user: null },
      });

      const result = await createReplyThunk({
        parentId: "1",
        content: "Reply",
      })(mockDispatch, mockGetState, undefined);

      expect(result.payload).toBe("Token não encontrado");
    });

    it("should call createReply service and return fulfilled", async () => {
      const mockReplyResponse: FeedTweetResponse = {
        id: "2",
        content: "Reply",
        parentId: "1",
        userId: "user1",
        createdAt: "",
        updatedAt: "",
        user: {
          id: "user1",
          name: "User 1",
          userName: "user1",
          email: "",
          createdAt: "",
          updatedAt: "",
          imageUrl: "",
        },
        likes: [],
        replies: [],
      };

      mockGetState.mockReturnValue({
        auth: { token: "token123", user: { id: "user1" } },
      });

      vi.mocked(replyService.createReply).mockResolvedValue(mockReplyResponse);

      const result = await createReplyThunk({
        parentId: "1",
        content: "Reply",
      })(mockDispatch, mockGetState, undefined);

      const expectedPayload = mapFeedTweet(mockReplyResponse, "user1");

      expect(result.type).toBe("feed/createReply/fulfilled");
      expect(result.payload).toEqual(expectedPayload);

      expect(replyService.createReply).toHaveBeenCalledWith(
        "token123",
        "1",
        "Reply",
      );
    });

    it("should reject if createReply service throws", async () => {
      mockGetState.mockReturnValue({
        auth: { token: "token123" },
      });

      vi.mocked(replyService.createReply).mockRejectedValue(new Error("Erro"));

      const result = await createReplyThunk({
        parentId: "1",
        content: "Reply",
      })(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("feed/createReply/rejected");
      expect(result.payload).toBe("Erro");
    });

    it("should reject if createReply returns undefined", async () => {
      mockGetState.mockReturnValue({
        auth: { token: "token123" },
      });

      vi.mocked(replyService.createReply).mockImplementationOnce(async () => {
        return undefined as unknown as FeedTweetResponse;
      });

      const result = await createReplyThunk({
        parentId: "1",
        content: "Reply",
      })(mockDispatch, mockGetState, undefined);

      expect(result.type).toBe("feed/createReply/rejected");
      expect(result.payload).toBe("Não foi possível criar uma resposta");
    });
  });

  describe("feedThunks - createTweet", () => {
    it("should reject if no token", async () => {
      mockGetState.mockReturnValue({
        auth: { token: null, user: null },
      });

      const result = await createTweetThunk("Novo tweet")(
        mockDispatch,
        mockGetState,
        undefined,
      );

      expect(result.payload).toBe("Token não encontrado");
      expect(result.type).toBe("feed/createTweet/rejected");
    });

    it("should call createTweet and return fulfilled", async () => {
      const mockTweet = createMockFeedResponse({
        id: "tweet1",
        content: "Novo tweet",
      });

      mockGetState.mockReturnValue({
        auth: { token: "token123", user: { id: "user1" } },
      });

      const mockedCreateTweet = vi.mocked(tweetService.createTweet);

      mockedCreateTweet.mockResolvedValue(
        mockTweet as Awaited<ReturnType<typeof tweetService.createTweet>>,
      );

      const result = await createTweetThunk("Novo tweet")(
        mockDispatch,
        mockGetState,
        undefined,
      );

      expect(tweetService.createTweet).toHaveBeenCalledWith(
        "token123",
        "Novo tweet",
      );

      expect(result.type).toBe("feed/createTweet/fulfilled");
    });

    it("should reject if service throws error", async () => {
      mockGetState.mockReturnValue({
        auth: { token: "token123", user: { id: "user1" } },
      });

      const mockedCreateTweet = vi.mocked(tweetService.createTweet);

      mockedCreateTweet.mockRejectedValue(new Error("Erro API"));

      const result = await createTweetThunk("Novo tweet")(
        mockDispatch,
        mockGetState,
        undefined,
      );

      expect(result.payload).toBe("Erro API");
      expect(result.type).toBe("feed/createTweet/rejected");
    });

    it("should reject with default error if unknown error occurs", async () => {
      mockGetState.mockReturnValue({
        auth: { token: "token123", user: { id: "user1" } },
      });

      const mockedCreateTweet = vi.mocked(tweetService.createTweet);

      mockedCreateTweet.mockRejectedValue("unexpected");

      const result = await createTweetThunk("Novo tweet")(
        mockDispatch,
        mockGetState,
        undefined,
      );

      expect(result.payload).toBe("Erro ao criar tweet");
    });
  });
});
