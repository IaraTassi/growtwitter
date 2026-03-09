import { Box } from "@mui/material";
import { TrendingTopicsCard } from "./TrendingTopicsCard";

export function RightBar() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        px: 2,
        py: 2,
        width: "100%",
        maxWidth: 300,
      }}
    >
      <TrendingTopicsCard />
    </Box>
  );
}
