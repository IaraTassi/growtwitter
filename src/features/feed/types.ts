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

  replyToId?: string | null;
  replyToUser?: FeedUser | null;
  replies: FeedTweet[];
}

export interface Like {
  userId: string;
  tweetId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedTweetResponse {
  id: string;
  content: string;
  userId: string;
  parentId?: string | null;
  parent?: FeedTweetResponse | null;
  createdAt: string;
  updatedAt: string;
  user: FeedUser;
  likes?: Like[];
  replies?: FeedTweetResponse[];
}

export interface ThreadItemProps {
  tweet: FeedTweet;
  level: number;
  onLike: (tweetId: string) => void;
  rootRepliesCount: number;
}

export type TabType = "foryou" | "following";
export interface FeedTabsProps {
  tab: TabType;
  setTab: (tab: TabType) => void;
}

export interface FeedContentProps {
  feed: FeedTweet[];
  loading: boolean;
  tab: TabType;
  setTab: (tab: TabType) => void;
  onLike: (tweetId: string) => void;
}

export interface FeedCardContentProps {
  tweet: FeedTweet;
  onLike: (tweetId: string) => void;
  showReplyLabel?: boolean;
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
