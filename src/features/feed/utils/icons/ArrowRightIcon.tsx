import { SvgIcon } from "@mui/material";
import type { IconProps } from "../../types";

export function ArrowRightIcon({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 13 10"
      fill="none"
      sx={(theme) => ({
        width: 13,
        height: 10,
        transition: "0.2s",
        color: color ?? theme.custom.icon.primary,
      })}
    >
      <path
        d="M4.86785 -1.30986e-05L5.83248 0.940091L2.57847 4.18937L12.8848 4.18937L12.8848 5.53778L2.57847 5.53777L5.85227 8.81157L4.88765 9.74695L-0.000477364 4.86357L4.86785 -1.30986e-05Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}
