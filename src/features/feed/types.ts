import type {
  BoxProps,
  ButtonProps,
  ModalProps,
  SvgIconProps,
  SxProps,
} from "@mui/material";

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
  isLiked: boolean;
  replies: FeedTweet[];
}

export interface Like {
  userId: string;
  tweetId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Follow {
  followerId: string;
  followingId: string;
  createdAt: string;
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
  likesCount: number;
  repliesCount: number;
}

export type CreateReplyApiResponse = {
  ok: boolean;
  message: string;
  reply: FeedTweetResponse;
};

export type CreateTweetApiResponse = {
  ok: boolean;
  message: string;
  tweet: FeedTweetResponse;
};

export interface FeedState {
  tweets: FeedTweet[];
  loading: boolean;
  error: string | null;
}

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

export interface ThreadListProps {
  root: FeedTweet;
  onLike: (id: string) => void;
  onReplyClick?: (tweetId: string) => void;
}

export type TimelineItem =
  | {
      kind: "following";
      root: FeedTweet;
    }
  | {
      kind: "foryou-simple";
      root: FeedTweet;
    }
  | {
      kind: "foryou-single-reply";
      root: FeedTweet;
      reply: FeedTweet;
    }
  | {
      kind: "foryou-thread";
      root: FeedTweet;
    };

export interface AppModalProps extends Omit<ModalProps, "children"> {
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

export interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

export interface SidebarNavItemProps extends BoxProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

export type SidebarUserProps = {
  userId: string;
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
  clickable?: boolean;
  forceColor?: string;
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

export type UseExplorerParams = {
  token: string;
  currentUserId: string;
};

export type UserWithRelations = FeedUser & {
  following?: Follow[];
  followers?: Follow[];
  followersCount?: number;
  followingCount?: number;
};

export interface ExplorerTimelineProps {
  users: SuggestedUser[];
  remaining: number;
  loading: boolean;
  onToggleFollow: (userId: string) => void;
  onLoadMore: () => void;
}

export interface SuggestedUser extends FeedUser {
  isFollowing: boolean;
  followersCount: number;
}

export interface SuggestedUsersListProps {
  users: SuggestedUser[];
  onToggleFollow: (userId: string) => void;
}

export interface ProfileTweetResponseDto {
  id: string;
  content: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
    userName: string;
    imageUrl?: string;
  };

  likesCount: number;
  repliesCount: number;
}

export interface ProfileReplyResponseDto {
  id: string;
  content: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
    userName: string;
    imageUrl?: string;
  };

  replies: ProfileReplyResponseDto[];
}

export interface ProfileLikedTweetResponseDto {
  id: string;
  content: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
    userName: string;
    imageUrl?: string;
  };

  parent?: {
    id: string;
    userName: string;
  };

  likesCount: number;
}

export interface ProfileUser extends FeedUser {
  followers?: Follow[];
  following?: Follow[];

  followersCount: number;
  followingCount: number;

  tweetsCount?: number;
  isFollowing: boolean;
}

export interface ProfileTimelineProps {
  user: ProfileUser;
}

export interface ProfileHeaderProps {
  name: string;
  tweetsCount: number;
  onClick?: () => void;
}

export interface ProfileBannerProps extends CustomAvatarProps {
  bannerHeight?: number;
}

export interface ProfileInfoProps {
  user: ProfileUser;
  followersCount: number;
  isFollowing: boolean;
  onToggleFollow: (userId: string) => void;
  onLogout: () => void;
}

export type ProfileTab = "tweets" | "replies" | "media" | "likes";

export interface ProfileTabsProps {
  tab: ProfileTab;
  setTab: (tab: ProfileTab) => void;
}

export interface TweetsTabProps {
  userId: string;
}

export interface TweetItemProps {
  tweet: ProfileTweetResponseDto;
  avatarSize: number;
  onReply: (tweetId: string) => void;
  onDelete: (tweetId: string) => void;
}

export interface RepliesTabProps {
  userId: string;
}

export interface ReplyThreadProps {
  node: ProfileReplyResponseDto;
}

export interface LikesTabProps {
  userId: string;
}

export interface LikedTweetItemProps {
  tweet: ProfileLikedTweetResponseDto;
}

export interface ProfileLinkProps {
  userId: string;
  children: React.ReactNode;
  sx?: SxProps;
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  hideCancelButton?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}
