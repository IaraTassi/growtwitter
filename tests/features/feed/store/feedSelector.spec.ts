import { describe, it, expect } from "vitest";
import {
  selectFeedTweets,
  selectFeedLoading,
  selectFeedError,
  selectLikedTweets,
  selectReplies,
} from "../../../../src/features/feed/store/feedSelectors";
import type { FeedTweet } from "../../../../src/features/feed/types";
import { RootState } from "../../../../src/store/store";

function createMockTweet(overrides?: Partial<FeedTweet>): FeedTweet {
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
    likesCount: 0,
    isLiked: false,
    repliesCount: 0,
    replyToId: null,
    replyToUser: null,
    replies: [],
    ...overrides,
  };
}

const mockState: RootState = {
  auth: {
    token: "token123",
    user: {
      id: "user1",
      name: "User 1",
      userName: "user1",
      email: "",
      imageUrl: "",
    },
    loading: false,
    error: null,
  },
  feed: {
    tweets: [
      createMockTweet({ id: "1" }),
      createMockTweet({ id: "2", isLiked: true }),
    ],
    loading: true,
    error: "Erro",
  },
};

describe("feedSelectors", () => {
  it("selectFeedTweets should return all tweets", () => {
    const tweets = selectFeedTweets(mockState);
    expect(tweets.length).toBe(2);
    expect(tweets[0].id).toBe("1");
  });

  it("selectFeedLoading should return loading state", () => {
    const loading = selectFeedLoading(mockState);
    expect(loading).toBe(true);
  });

  it("selectFeedError should return error message", () => {
    const error = selectFeedError(mockState);
    expect(error).toBe("Erro");
  });

  it("selectLikedTweets should return only liked tweets", () => {
    const liked = selectLikedTweets(mockState);
    expect(liked.length).toBe(1);
    expect(liked[0].id).toBe("2");
  });

  it("selectFeedReplies should return replies for a tweet", () => {
    const tweetWithReplies = createMockTweet({
      id: "3",
      replies: [
        createMockTweet({ id: "3-1", replyToId: "3" }),
        createMockTweet({ id: "3-2", replyToId: "3" }),
      ],
    });

    const stateWithReplies: RootState = {
      ...mockState,
      feed: {
        tweets: [...mockState.feed.tweets, tweetWithReplies],
        loading: false,
        error: null,
      },
    };

    const allReplies = selectReplies(stateWithReplies);
    const repliesForTweet3 = allReplies.filter(
      (r: FeedTweet) => r.replyToId === "3",
    );

    expect(repliesForTweet3.length).toBe(2);
    expect(repliesForTweet3.map((r: FeedTweet) => r.id)).toEqual([
      "3-1",
      "3-2",
    ]);
  });
});
