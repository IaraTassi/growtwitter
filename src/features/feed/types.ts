export interface FeedUser {
  id: string;
  name: string;
  userName: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FeedTweet {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

  user: FeedUser;
  likesCount: number;
  repliesCount: number;
}

export type TabType = "foryou" | "following";

export interface FeedTweetApi extends FeedTweet {
  likes?: unknown[];
  replies?: unknown[];
}

export interface FeedContentProps {
  feed: FeedTweet[];
  loggedUserId: string | null;
  loading: boolean;
}

export interface FeedTweetResponse {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

  user: FeedUser;

  likes?: unknown[];
  replies?: unknown[];
}
