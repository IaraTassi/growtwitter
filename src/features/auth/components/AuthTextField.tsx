import TextField, { type TextFieldProps } from "@mui/material/TextField";

type AuthTextFieldProps = TextFieldProps & {
  errorMessage?: string;
};

export function AuthTextField({ errorMessage, ...props }: AuthTextFieldProps) {
  return (
    <TextField
      {...props}
      error={!!errorMessage}
      helperText={errorMessage || " "}
      size="small"
      fullWidth
    />
  );
}
