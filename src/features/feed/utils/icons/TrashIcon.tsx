import { SvgIcon } from "@mui/material";
import { COLORS } from "../../../../theme/colors";
import type { IconProps } from "../../types";

export function TrashIcon({ color = COLORS.textTertiary }: IconProps) {
  return (
    <SvgIcon
      sx={{
        cursor: "pointer",
        width: 12,
        height: 12,
        color: color,
        transition: "0.2s",
      }}
    >
      <path
        d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"
        fill="curentColor"
      />
    </SvgIcon>
  );
}
