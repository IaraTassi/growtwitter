import { SvgIcon, type IconProps } from "@mui/material";

export function GraphIcon({ color }: IconProps) {
  return (
    <SvgIcon
      viewBox="0 0 10 11"
      sx={(theme) => ({
        width: 12,
        height: 12,
        transition: "0.2s",
        color: color ?? theme.custom.icon.muted,
      })}
    >
      <path d="M1.2 4.75183H0V11.0008H1.2V4.75183Z" fill="currentColor" />
      <path
        d="M7.06621 6.83508H5.86621V11.0008H7.06621V6.83508Z"
        fill="currentColor"
      />
      <path d="M9.9998 3.2547H8.7998V11H9.9998V3.2547Z" fill="currentColor" />
      <path d="M4.13359 0H2.93359V11H4.13359V0Z" fill="currentColor" />
    </SvgIcon>
  );
}
