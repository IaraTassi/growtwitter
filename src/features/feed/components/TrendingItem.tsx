import { Box, Typography } from "@mui/material";
import type { TrendingItemProps } from "../types";

export function TrendingItem({ topic }: TrendingItemProps) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: "0.625rem",
          fontWeight: 500,
          color: "text.disabled",
        }}
      >
        {topic.description}
      </Typography>
      <Typography
        sx={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        {topic.category} · {topic.title}
      </Typography>

      <Typography
        sx={{
          fontSize: "0.625rem",
          fontWeight: 500,
          color: "text.disabled",
        }}
      >
        {topic.tweets}
      </Typography>
    </Box>
  );
}
