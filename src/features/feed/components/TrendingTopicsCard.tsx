import { Paper, Stack, Typography } from "@mui/material";
import { TrendingItem } from "./TrendingItem";
import { trendingTopics } from "../mocks/trendingTopics";
import { COLORS } from "../../../theme/colors";
import { useNavigate } from "react-router-dom";

export function TrendingTopicsCard() {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("explorer");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: COLORS.trendingTopicsBg,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: "0.875rem",
          fontWeight: 800,
          p: 2,
          pb: 1.5,
        }}
      >
        O que está acontecendo
      </Typography>

      <Stack spacing={1.5}>
        {trendingTopics.map((topic, index) => (
          <TrendingItem key={index} topic={topic} />
        ))}
      </Stack>

      <Typography
        color="primary"
        sx={{
          cursor: "pointer",
          fontSize: "0.625rem",
          fontWeight: 500,
          p: 2,
          pb: 1,
        }}
        onClick={handleShowMore}
      >
        Mostrar mais
      </Typography>
    </Paper>
  );
}
