import { Link } from "react-router-dom";
import type { ProfileLinkProps } from "../types";
import { Box } from "@mui/material";

export function ProfileLink({ userId, children, sx }: ProfileLinkProps) {
  return (
    <Link
      data-cy="profile-link"
      to={`/app/profile/${userId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box sx={sx}>{children}</Box>
    </Link>
  );
}
