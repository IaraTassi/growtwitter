import { Box, Typography } from "@mui/material";
import type { SuggestedUsersListProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { VerifyIcon } from "../utils/icons/VerifyIcon";
import { PrimaryButton } from "./PrimaryButton";
import { ProfileLink } from "./ProfileLink";

export function SuggestedUsersList({
  users,
  onToggleFollow,
}: SuggestedUsersListProps) {
  return (
    <Box display="flex" flexDirection="column">
      {users.map((user) => {
        const isVerified = !!user.imageUrl;
        const variant = isVerified ? "primary" : "secondary";

        return (
          <Box data-cy="suggestion-card" key={user.id} sx={{ px: 3 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={(theme) => ({
                py: 3,
                mx: -3,
                px: 3,
                borderBottom: `1px solid ${theme.palette.divider}`,
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: theme.custom.hover.item,
                },
              })}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <ProfileLink userId={user.id}>
                  <CustomAvatar imageUrl={user.imageUrl} />
                </ProfileLink>
                <Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <ProfileLink userId={user.id}>
                      <Typography sx={{ fontWeight: 700, fontSize: 12 }}>
                        {user.name}
                      </Typography>
                    </ProfileLink>
                    <VerifyIcon
                      variant={variant}
                      sx={(theme) => ({
                        width: 12,
                        height: 12,
                        color: isVerified
                          ? theme.palette.text.primary
                          : theme.custom.text.muted,
                      })}
                    />
                  </Box>

                  <Typography
                    data-cy="user-username"
                    sx={(theme) => ({
                      fontWeight: 400,
                      fontSize: 12,
                      color: theme.custom.text.muted,
                    })}
                  >
                    @{user.userName}
                  </Typography>
                </Box>
              </Box>

              <PrimaryButton
                data-cy="follow-button"
                variant={user.isFollowing ? "outlined" : "contained"}
                onClick={() => onToggleFollow(user.id)}
              >
                {user.isFollowing ? "Seguindo" : "Seguir"}
              </PrimaryButton>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
