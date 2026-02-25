import type { SvgIconProps } from "@mui/material";

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
  isLiked?: boolean;
}

export type TabType = "foryou" | "following";
export interface FeedTabsProps {
  tab: TabType;
  setTab: (tab: TabType) => void;
}

export interface FeedContentProps {
  feed: FeedTweet[];
  loggedUserId: string | null;
  loading: boolean;
}

export interface FeedCardContentProps {
  tweet: FeedTweet;
  onLike: (tweetId: string) => void;
}

export type VerifyIconProps = SvgIconProps & {
  variant?: "primary" | "secondary";
};

export type CustomAvatarProps = {
  imageUrl?: string | null;
} & Omit<SvgIconProps, "children">;

export interface ReplyIconProps {
  onClick?: () => void;
}

export interface LikeIconProps {
  isLiked?: boolean;
  onClick?: () => void;
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
