import { createTheme } from "@mui/material/styles";
import { COLORS } from "./../theme/colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: COLORS.button },
    secondary: { main: COLORS.textHighlight },
    background: {
      default: COLORS.background,
      paper: COLORS.cardExplorer,
    },
    text: {
      primary: COLORS.textPrimary,
      secondary: COLORS.textSecondary,
      disabled: COLORS.textTertiary,
    },
    error: { main: COLORS.error },
  },
  typography: {
    fontFamily: "'Karla', sans-serif",
  },
  custom: {
    profileContainerBg: COLORS.profileContainerBg,
    modalBackground: COLORS.modalBackground,
    tweetLogo: COLORS.tweetLogo,
    cardExplorer: COLORS.cardExplorer,
    iconEllipse: COLORS.iconEllipse,
    iconDefault: COLORS.iconDefault,
    iconFooter: COLORS.iconFooter,
    iconLike: COLORS.iconLike,
    iconClose: COLORS.iconClose,
    textHighlight: COLORS.textHighlight,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #0B0707 inset",
            WebkitTextFillColor: "#fff",
            caretColor: "#0B0707",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: COLORS.textTertiary,
          "&.Mui-selected": {
            color: COLORS.textPrimary,
          },
          "&:hover": {
            backgroundColor: "profileContainerBg",
          },
        },
      },
    },
  },
});
