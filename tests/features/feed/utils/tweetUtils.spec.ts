import {
  collectReplies,
  flattenTweets,
  hasUserReply,
  mapThreads,
  removeTweetRecursive,
} from "../../../../src/features/feed/utils/tweetUtils";
import { describe, expect, it } from "vitest";
import { FeedTweet } from "../../../../src/features/feed/types";

function createMockTweet(overrides?: Partial<FeedTweet>): FeedTweet {
  const baseUserId = overrides?.userId ?? overrides?.user?.id ?? "user1";

  const base: FeedTweet = {
    id: "1",
    content: "Tweet",
    userId: baseUserId,
    createdAt: "",
    updatedAt: "",
    user: {
      id: baseUserId,
      name: "User 1",
      userName: "user1",
      email: "",
      createdAt: "",
      updatedAt: "",
    },
    likesCount: 0,
    isLiked: false,
    repliesCount: 0,
    replies: [],
  };

  return {
    ...base,
    ...overrides,
    userId: baseUserId,
    user: {
      ...base.user,
      ...overrides?.user,
      id: baseUserId,
    },
  };
}

describe("tweetUtils", () => {
  describe("tweetUtils - removeTweetRecursive", () => {
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

  describe("tweetUtils - collectReplies", () => {
    it("should return empty array when tweet has no replies", () => {
      const tweet = createMockTweet();

      const result = collectReplies(tweet);

      expect(result).toEqual([]);
    });

    it("should return replies without enforcing order", () => {
      const reply1 = createMockTweet({ id: "2", createdAt: "2024-01-02" });
      const reply2 = createMockTweet({ id: "3", createdAt: "2024-01-01" });

      const tweet = createMockTweet({
        replies: [reply1, reply2],
      });

      const result = collectReplies(tweet);

      expect(result.map((r) => r.id)).toEqual(["2", "3"]);
    });

    it("should preserve nested replies recursively", () => {
      const nested = createMockTweet({ id: "3" });
      const reply = createMockTweet({ id: "2", replies: [nested] });

      const tweet = createMockTweet({
        replies: [reply],
      });

      const result = collectReplies(tweet);

      expect(result[0].replies.length).toBe(1);
      expect(result[0].replies[0].id).toBe("3");
    });

    it("should not mutate original replies array", () => {
      const reply = createMockTweet({ id: "2" });
      const tweet = createMockTweet({
        replies: [reply],
      });

      const originalReplies = tweet.replies;

      collectReplies(tweet);

      expect(tweet.replies).toBe(originalReplies);
    });
  });

  describe("tweetUtils - hasUserReply", () => {
    it("should return true if root tweet is from user", () => {
      const tweet = createMockTweet({ userId: "user1" });

      const result = hasUserReply(tweet, "user1");

      expect(result).toBe(true);
    });

    it("should return true if user replied at first level", () => {
      const reply = createMockTweet({ userId: "user2" });
      const tweet = createMockTweet({
        replies: [reply],
      });

      const result = hasUserReply(tweet, "user2");

      expect(result).toBe(true);
    });

    it("should return true if user replied in nested replies", () => {
      const nested = createMockTweet({ userId: "user3" });
      const reply = createMockTweet({ replies: [nested] });
      const tweet = createMockTweet({
        replies: [reply],
      });

      const result = hasUserReply(tweet, "user3");

      expect(result).toBe(true);
    });

    it("should return false if user has no replies in thread", () => {
      const reply = createMockTweet({ userId: "user2" });
      const tweet = createMockTweet({
        replies: [reply],
      });

      const result = hasUserReply(tweet, "user999");

      expect(result).toBe(false);
    });
  });

  describe("tweetUtils - mapThreads", () => {
    it("should return empty map if no tweets match user replies", () => {
      const tweet = createMockTweet();
      const feed = [tweet];

      const result = mapThreads(feed, "user999");

      expect(result.size).toBe(0);
    });

    it("should include only tweets where user has replies", () => {
      const reply = createMockTweet({ userId: "user2" });
      const tweet1 = createMockTweet({
        id: "1",
        replies: [reply],
      });

      const tweet2 = createMockTweet({ id: "2" });

      const feed = [tweet1, tweet2];

      const result = mapThreads(feed, "user2");

      expect(result.size).toBe(1);
      expect(result.has("1")).toBe(true);
      expect(result.has("2")).toBe(false);
    });

    it("should keep full thread replies when user is present", () => {
      const nested = createMockTweet({ userId: "user2" });
      const reply = createMockTweet({ id: "2", replies: [nested] });
      const tweet = createMockTweet({
        id: "1",
        replies: [reply],
      });

      const result = mapThreads([tweet], "user2");

      const thread = result.get("1");

      expect(thread).toBeDefined();
      expect(thread?.replies[0].replies.length).toBe(1);
    });

    it("should sort root tweets by createdAt DESC", () => {
      const tweet1 = createMockTweet({
        id: "1",
        createdAt: "2024-01-01",
        replies: [createMockTweet({ userId: "user2" })],
      });

      const tweet2 = createMockTweet({
        id: "2",
        createdAt: "2024-01-02",
        replies: [createMockTweet({ userId: "user2" })],
      });

      const result = mapThreads([tweet1, tweet2], "user2");

      const keys = Array.from(result.keys());

      expect(keys[0]).toBe("2");
      expect(keys[1]).toBe("1");
    });
  });

  describe("tweetUtils - flattenTweets", () => {
    it("should return empty array when input is empty", () => {
      const result = flattenTweets([]);

      expect(result).toEqual([]);
    });

    it("should return single tweet when there are no replies", () => {
      const tweet = createMockTweet({ id: "1" });

      const result = flattenTweets([tweet]);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should flatten one level of replies", () => {
      const reply = createMockTweet({ id: "2" });
      const tweet = createMockTweet({ id: "1", replies: [reply] });

      const result = flattenTweets([tweet]);

      expect(result).toHaveLength(2);
      expect(result.map((t) => t.id)).toEqual(["1", "2"]);
    });

    it("should flatten nested replies recursively", () => {
      const nestedReply = createMockTweet({ id: "3" });
      const reply = createMockTweet({ id: "2", replies: [nestedReply] });
      const tweet = createMockTweet({ id: "1", replies: [reply] });

      const result = flattenTweets([tweet]);

      expect(result).toHaveLength(3);
      expect(result.map((t) => t.id)).toEqual(["1", "2", "3"]);
    });

    it("should flatten multiple root tweets", () => {
      const tweet1 = createMockTweet({ id: "1" });
      const tweet2 = createMockTweet({ id: "2" });

      const result = flattenTweets([tweet1, tweet2]);

      expect(result).toHaveLength(2);
      expect(result.map((t) => t.id)).toEqual(["1", "2"]);
    });

    it("should flatten multiple tweets with replies", () => {
      const reply1 = createMockTweet({ id: "2" });
      const tweet1 = createMockTweet({ id: "1", replies: [reply1] });

      const reply2 = createMockTweet({ id: "4" });
      const tweet2 = createMockTweet({ id: "3", replies: [reply2] });

      const result = flattenTweets([tweet1, tweet2]);

      expect(result).toHaveLength(4);
      expect(result.map((t) => t.id)).toEqual(["1", "2", "3", "4"]);
    });

    it("should preserve depth-first order", () => {
      const nestedReply = createMockTweet({ id: "4" });
      const reply1 = createMockTweet({ id: "2", replies: [nestedReply] });
      const reply2 = createMockTweet({ id: "3" });

      const tweet = createMockTweet({
        id: "1",
        replies: [reply1, reply2],
      });

      const result = flattenTweets([tweet]);

      expect(result.map((t) => t.id)).toEqual(["1", "2", "4", "3"]);
    });
  });
});
