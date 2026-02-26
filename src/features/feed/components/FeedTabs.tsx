import { Box, Tab, Tabs } from "@mui/material";
import type { FeedTabsProps, TabType } from "../types";

export function FeedTabs({ tab, setTab }: FeedTabsProps) {
  const handleChange = (_event: React.SyntheticEvent, newValue: TabType) => {
    setTab(newValue);
  };

  const tabs: { value: TabType; label: string }[] = [
    { value: "foryou", label: "Para Você" },
    { value: "following", label: "Seguindo" },
  ];

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        sx={{ minHeight: "auto", width: "100%" }}
      >
        {tabs.map((tabItem) => (
          <Tab
            key={tabItem.value}
            value={tabItem.value}
            label={tabItem.label}
          />
        ))}
      </Tabs>
    </Box>
  );
}
