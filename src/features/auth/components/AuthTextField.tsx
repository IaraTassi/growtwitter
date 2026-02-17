import { TextField } from "@mui/material";
import type { AuthTextFieldProps } from "../types";

export function AuthTextField({
  errorMessage,
  helperContent,
  helperText,
  slotProps,
  ...props
}: AuthTextFieldProps & {
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}) {
  const isCustomHelper = Boolean(helperContent);

  return (
    <TextField
      {...props}
      error={props.error || !!errorMessage}
      helperText={helperContent ?? helperText ?? errorMessage ?? " "}
      size="small"
      fullWidth
      spellCheck={false}
      slotProps={{
        formHelperText: {
          sx: {
            ...(isCustomHelper && {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }),
          },
        },
        input: {
          ...(slotProps?.input ?? {}),
        },
        ...slotProps,
      }}
    />
  );
}
