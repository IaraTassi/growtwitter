import { Box } from "@mui/material";
import type { CustomAvatarProps } from "../types";
import { BgDefaultIcon } from "../utils/icons/BgDefaultIcon";
import { CustomAvatar } from "../utils/icons/CustomAvatar";

export interface ProfileBannerProps extends CustomAvatarProps {
  bannerHeight?: number;
}

export function ProfileBanner({
  imageUrl,
  bannerHeight = 130,
}: ProfileBannerProps) {
  const avatarSize = 90;

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        height: bannerHeight,
        position: "relative",
        bgcolor: theme.custom.surface,
      })}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BgDefaultIcon />
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: -(avatarSize / 2),
          left: 16,
          width: avatarSize,
          height: avatarSize,
          zIndex: 10,
        }}
      >
        <CustomAvatar imageUrl={imageUrl} width="100%" height="100%" />
      </Box>
    </Box>
  );
}
