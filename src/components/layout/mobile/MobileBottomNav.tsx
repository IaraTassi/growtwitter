import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { createTweetThunk } from "../../../features/feed/store/feedThunks";
import { useAppDispatch } from "../../../hooks/redux";
import { getNavItems } from "../../../navigation/navItems";
import type { RootState } from "../../../store/store";
import { AppLink } from "./AppLink";
import { MobileTweetButton } from "./MobileTweetButton";

export function MobileBottomNav() {
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const userId = user?.id;

  const items = getNavItems(userId);

  const handleCreateTweet = async (content: string) => {
    await dispatch(createTweetThunk(content));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
    >
      <Box
        sx={(theme) => ({
          position: "relative",
          height: 56,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          bgcolor: theme.custom.layout.inner,
          borderTop: `1px solid ${theme.palette.divider}`,
        })}
      >
        {items.map((item) => (
          <AppLink key={item.label} to={item.to}>
            <item.icon />
          </AppLink>
        ))}

        <MobileTweetButton
          userImageUrl={user?.imageUrl}
          onSubmit={handleCreateTweet}
        />
      </Box>
    </Box>
  );
}
