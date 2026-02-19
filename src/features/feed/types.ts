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
  likesCount?: number;
  repliesCount?: number;
}
