import type { SvgIconProps } from "@mui/material";

export interface FeedUser {
  id: string;
  name: string;
  userName: string;
  email: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FeedTweet {
  id: string;
  content: string;
  userId: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;

  user: FeedUser;
  likesCount: number;
  repliesCount: number;
  isLiked?: boolean;
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
  createdAt: string;
  updatedAt: string;
  user: FeedUser;
  likes?: Like[];
  replies?: FeedTweetResponse[];
}

export interface TweetResponse {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: FeedUser;
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
}

export type CreateReplyApiResponse = {
  ok: boolean;
  message: string;
  reply: FeedTweetResponse;
};

export type CreateTweetApiResponse = {
  ok: boolean;
  message: string;
  tweet: TweetResponse;
};

export type TabType = "foryou" | "following";

export interface FeedTabsProps {
  tab: TabType;
  setTab: (tab: TabType) => void;
}

export interface FeedContentProps {
  items: TimelineItem[];
  loading: boolean;
  tab: TabType;
  setTab: (tab: TabType) => void;
  onLike: (tweetId: string) => void;
  onReply: (parentId: string, content: string) => void;
  userImageUrl?: string | null;
}

export interface FeedCardContentProps {
  tweet: FeedTweet;
  parentTweet?: FeedTweet;
  onLike: (tweetId: string) => void;
  onReplyClick?: (tweetId: string) => void;
  showReplyLabel?: boolean;
  showThreadLine?: boolean;
  isLastInThread?: boolean;
}

export interface FeedBlockProps {
  variant: "isolated" | "thread";
  showTopDivider?: boolean;
  showBottomDivider?: boolean;
  children: React.ReactNode;
}

export interface ThreadItemProps {
  root: FeedTweet;
  onLike: (id: string) => void;
  onReplyClick?: (tweetId: string) => void;
}

export interface AppModalProps {
  open: boolean;
  onClose: () => void;
  width?: number;
  children: React.ReactNode;
}

export interface ComposerModalProps {
  open: boolean;
  onClose: () => void;
  userImageUrl?: string | null;
  onSubmit: (content: string) => Promise<void> | void;
  submitLabel?: string;
}

export interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
  variant?: "contained" | "outlined";
  fullWidth?: boolean;
  sx?: object;
}

export type TimelineItem =
  | {
      kind: "following";
      root: FeedTweet;
    }
  | {
      kind: "foryou-simple";
      root: FeedTweet;
      replies: FeedTweet[];
    }
  | {
      kind: "foryou-single-reply";
      root: FeedTweet;
      reply: FeedTweet;
    }
  | {
      kind: "foryou-thread";
      root: FeedTweet;
      replies: FeedTweet[];
      hasNestedReplies: boolean;
    };

export interface FeedState {
  tweets: FeedTweet[];
  loading: boolean;
  error: string | null;
}

export interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

export type SidebarUserProps = {
  name: string;
  userName: string;
  imageUrl?: string;
  onLogout: () => void;
};

export type VerifyIconProps = SvgIconProps & {
  variant?: "primary" | "secondary";
};

export type CustomAvatarProps = {
  imageUrl?: string | null;
  width?: number | string;
  height?: number | string;
} & Omit<SvgIconProps, "children">;

export interface ReplyIconProps {
  onClick?: () => void;
}

export interface LikeIconProps {
  isLiked?: boolean;
  onClick?: () => void;
}

export interface IconProps {
  color?: string;
  size?: number;
}

export interface TrendingItemProps {
  topic: {
    category: string;
    title: string;
    description: string;
    tweets: string;
  };
}

export interface SuggestedUser extends FeedUser {
  following: {
    followerId: string;
    followingId: string;
    createdAt: string;
  }[];
  followers: {
    followerId: string;
    followingId: string;
    createdAt: string;
  }[];
  isFollowing?: boolean;
}

export interface SuggestedUsersContainerProps {
  token: string;
  currentUserId: string;
}

export interface SuggestedUsersListProps {
  users: SuggestedUser[];
  onToggleFollow: (userId: string) => void;
}

export interface ProfileHeaderProps {
  name: string;
  tweetsCount: number;
  onClick?: () => void;
}

export interface ProfileUser extends FeedUser {
  tweets: FeedTweetResponse[];
  likes: Like[];
  followers: {
    followerId: string;
    followingId: string;
    createdAt: string;
  }[];
  following: {
    followerId: string;
    followingId: string;
    createdAt: string;
  }[];
}

export interface ProfileBannerProps extends CustomAvatarProps {
  bannerHeight?: number;
}

export type ProfileTab = "tweets" | "replies" | "media" | "likes";

export interface ProfileTabsProps {
  tab: ProfileTab;
  setTab: (tab: ProfileTab) => void;
}

export interface ProfileInfoProps {
  user: ProfileUser;
}

export interface TweetTabProps {
  user: FeedUser;
  allTweets?: FeedTweet[];
}

export type ReplyThreadProps = {
  root: FeedTweet;
  replies: FeedTweet[];
  currentUserId: string;
};
