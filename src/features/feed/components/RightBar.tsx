import { Box } from "@mui/material";
import { TrendingTopicsCard } from "./TrendingTopicsCard";
import { ThemeToggleButton } from "../../../components/theme/ThemeToggleButton";

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
        position: "fixed",
        top: 0,
      }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-start"
        gap={2}
      >
        <TrendingTopicsCard />
        <ThemeToggleButton />
      </Box>
    </Box>
  );
}
