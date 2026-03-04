import { Box, Divider } from "@mui/material";
import type { FeedBlockProps } from "../types";

export function FeedBlock({
  variant,
  showTopDivider = false,
  showBottomDivider = false,
  children,
}: FeedBlockProps) {
  return (
    <Box
      component="section"
      sx={{
        position: variant === "thread" ? "relative" : "static",
      }}
    >
      {showTopDivider && <Divider />}

      <Box>{children}</Box>

      {showBottomDivider && <Divider />}
    </Box>
  );
}
