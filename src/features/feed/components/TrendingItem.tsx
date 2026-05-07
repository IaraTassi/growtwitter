import { Box, Typography } from "@mui/material";
import type { TrendingItemProps } from "../types";

export function TrendingItem({ topic }: TrendingItemProps) {
  return (
    <Box
      sx={(theme) => ({
        px: 2,
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: theme.custom.hover.item,
        },
      })}
    >
      <Typography
        sx={(theme) => ({
          fontSize: "0.625rem",
          fontWeight: 500,
          color: theme.custom.text.muted,
        })}
      >
        {topic.description}
      </Typography>
      <Typography
        sx={(theme) => ({
          fontSize: "0.75rem",
          fontWeight: 700,
          color: theme.palette.text.primary,
        })}
      >
        {topic.category} · {topic.title}
      </Typography>

      <Typography
        sx={(theme) => ({
          fontSize: "0.625rem",
          fontWeight: 500,
          color: theme.custom.text.muted,
        })}
      >
        {topic.tweets}
      </Typography>
    </Box>
  );
}
