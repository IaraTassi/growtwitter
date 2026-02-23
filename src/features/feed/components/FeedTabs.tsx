import { Box, Tab, Tabs } from "@mui/material";
import type { FeedTabsProps } from "../types";

export function FeedTabs({ tab, setTab }: FeedTabsProps) {
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue as "foryou" | "following");
  };

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        sx={{
          minHeight: "auto",
          display: "flex",
          width: "100%",
        }}
      >
        {["foryou", "following"].map((value) => (
          <Tab
            key={value}
            value={value}
            label={value === "foryou" ? "Para Você" : "Seguindo"}
          />
        ))}
      </Tabs>
    </Box>
  );
}
