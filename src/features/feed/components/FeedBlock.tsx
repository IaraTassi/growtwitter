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
      sx={(theme) => ({
        position: variant === "thread" ? "relative" : "static",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: theme.custom.hover.item,
        },
      })}
    >
      {showTopDivider && (
        <Divider sx={(theme) => ({ color: theme.palette.divider })} />
      )}

      <Box>{children}</Box>

      {showBottomDivider && (
        <Divider sx={(theme) => ({ color: theme.palette.divider })} />
      )}
    </Box>
  );
}
