import { removeTweetRecursive } from "../../../../src/features/feed/utils/tweetUtils";
import { describe, expect, it } from "vitest";
import { FeedTweet } from "../../../../src/features/feed/types";

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

describe("feedUtils - removeTweetRecursive", () => {
  it("should remove a root tweet reply", () => {
    const reply = createMockTweet({ id: "2" });
    const tweet = createMockTweet({ replies: [reply] });

    const updated = removeTweetRecursive(tweet, "2");

    expect(updated.replies.length).toBe(0);
  });

  it("should remove nested replies recursively", () => {
    const nestedReply = createMockTweet({ id: "3" });
    const reply = createMockTweet({ id: "2", replies: [nestedReply] });
    const tweet = createMockTweet({ replies: [reply] });

    const updated = removeTweetRecursive(tweet, "3");

    expect(updated.replies[0].replies.length).toBe(0);
    expect(updated.replies[0].id).toBe("2");
  });

  it("should remove multiple nested replies", () => {
    const reply1 = createMockTweet({ id: "2" });
    const reply2 = createMockTweet({ id: "3" });
    const tweet = createMockTweet({ replies: [reply1, reply2] });

    const updated = removeTweetRecursive(tweet, "3");

    expect(updated.replies.length).toBe(1);
    expect(updated.replies[0].id).toBe("2");
  });

  it("should not modify tweet if id does not exist", () => {
    const reply = createMockTweet({ id: "2" });
    const tweet = createMockTweet({ replies: [reply] });

    const updated = removeTweetRecursive(tweet, "999");

    expect(updated).toEqual(tweet);
  });

  it("should remove tweet even if it has no replies", () => {
    const tweet = createMockTweet({ id: "1" });

    const updated = removeTweetRecursive(tweet, "1");

    expect(updated.replies.length).toBe(0);
    expect(updated.id).toBe("1");
  });
});
