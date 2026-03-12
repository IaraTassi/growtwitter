import { Box, Typography } from "@mui/material";
import type { SuggestedUsersListProps } from "../types";
import { CustomAvatar } from "../utils/icons/CustomAvatar";
import { VerifyIcon } from "../utils/icons/VerifyIcon";
import { PrimaryButton } from "./PrimaryButton";

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
          <Box key={user.id} sx={{ px: 3 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                py: 1.5,
                mx: -3,
                px: 3,
                transition: "background 0.2s",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <CustomAvatar imageUrl={user.imageUrl} />
                <Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography sx={{ fontWeight: 700, fontSize: 12 }}>
                      {user.name}
                    </Typography>
                    <VerifyIcon
                      variant={variant}
                      sx={{
                        width: 12,
                        height: 12,
                        color: isVerified ? "primary.main" : "text.disabled",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{ fontWeight: 400, fontSize: 12 }}
                    color="text.disabled"
                  >
                    @{user.userName}
                  </Typography>
                </Box>
              </Box>

              <PrimaryButton
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
