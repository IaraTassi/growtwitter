import { describe, expect, it } from "vitest";
import { mapFeedTweet } from "../../../../src/features/feed/mappers/feedMapper";

describe("mapFeedTweet", () => {
  it("should map likes and replies correctly", () => {
    const input = {
      id: "1",
      content: "Hello",
      userId: "u1",
      createdAt: "",
      updatedAt: "",
      user: {
        id: "u1",
        name: "John",
        userName: "john",
        createdAt: "",
        updatedAt: "",
      },
      likes: [{}, {}],
      replies: [{}],
    };

    const result = mapFeedTweet(input);

    expect(result.likesCount).toBe(2);
    expect(result.repliesCount).toBe(1);
  });
});
