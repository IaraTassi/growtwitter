import { Box, IconButton, Typography } from "@mui/material";
import { ArrowRightIcon } from "../utils/icons/ArrowRightIcon";
import type { ProfileHeaderProps } from "../types";
import { useNavigate } from "react-router-dom";

export function ProfileHeader({ name, tweetsCount }: ProfileHeaderProps) {
  const navigate = useNavigate();

  return (
    <Box
      id="explorer-timeline-heading"
      display="flex"
      alignItems="center"
      gap={2}
    >
      <IconButton onClick={() => navigate(-1)} size="small">
        <ArrowRightIcon />
      </IconButton>
      <Box display="flex" flexDirection="column" lineHeight={1}>
        <Typography
          component="h2"
          id="explorer-timeline-heading"
          sx={{ fontSize: "0.875rem", fontWeight: 800 }}
        >
          Perfil de {name}
        </Typography>

        <Typography
          component="span"
          sx={{
            fontSize: "0.625rem",
            fontWeight: 500,
            color: "text.disabled",
          }}
        >
          {tweetsCount} growteets
        </Typography>
      </Box>
    </Box>
  );
}
