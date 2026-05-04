import type { ProfileUser, UserWithRelations } from "../types";

export function mapUser(
  user: UserWithRelations,
  loggedUserId?: string,
): ProfileUser {
  const followers = user.followers ?? [];
  const following = user.following ?? [];

  return {
    ...user,

    followersCount: user.followersCount ?? followers.length ?? 0,

    followingCount: user.followingCount ?? following.length ?? 0,

    isFollowing: loggedUserId
      ? followers.some((f) => f.followerId === loggedUserId)
      : false,
  };
}
