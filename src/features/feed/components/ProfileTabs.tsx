import { Box, Typography } from "@mui/material";
import type { ProfileTab, ProfileTabsProps } from "../types";

const tabs: { label: string; key: ProfileTab }[] = [
  { label: "Tweets", key: "tweets" },
  { label: "Respostas", key: "replies" },
  { label: "Mídia", key: "media" },
  { label: "Curtidas", key: "likes" },
];

export function ProfileTabs({ tab, setTab }: ProfileTabsProps) {
  return (
    <Box
      display="flex"
      sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.divider}` })}
    >
      {tabs.map(({ label, key }) => (
        <Box
          key={key}
          data-cy={`tab-${key}`}
          sx={{
            px: 3,
            py: 1.5,
            cursor: "pointer",
            borderBottom: tab === key ? "2px solid" : "2px solid transparent",
            borderColor: tab === key ? "primary.main" : "transparent",
            "&:hover": { backgroundColor: "action.hover" },
          }}
          onClick={() => setTab(key)}
        >
          <Typography
            sx={{
              fontWeight: tab === key ? 700 : 500,
              fontSize: "0.875rem",
            }}
          >
            {label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
