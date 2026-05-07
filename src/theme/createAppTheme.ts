import { createTheme } from "@mui/material";
import { semanticColors } from "./tokens/semanticColors";

export const createAppTheme = (mode: "light" | "dark") => {
  const s = semanticColors[mode];

  return createTheme({
    palette: {
      mode,

      primary: {
        main: s.primary,
      },

      background: {
        default: s.appBackground,
        paper: s.paper,
      },

      text: {
        primary: s.textPrimary,
        secondary: s.textSecondary,
      },

      divider: s.border,

      error: {
        main: s.danger,
      },
    },

    typography: {
      fontFamily: "Karla, sans-serif",
    },

    custom: {
      brand: {
        logoPrimary: s.brand.logoPrimary,
        logoAccent: s.brand.logoAccent,
      },

      layout: {
        outer: s.appBackground,
        inner: s.appShell,
      },

      surface: s.surface,
      paper: s.paper,
      card: s.card,

      border: s.border,

      overlay: {
        page: s.overlay.page,
        modal: s.overlay.modal,
      },

      auth: {
        form: s.appShell,
        accent: s.primary,
        text: "#FFFFFF",
      },

      text: {
        muted: s.textMuted,
        link: s.textLink,
      },

      avatar: {
        background: s.avatar.background,
        icon: s.avatar.icon,
      },

      banner: {
        icon: s.banner.icon,
      },

      icon: {
        primary: s.textPrimary,
        secondary: s.textSecondary,
        muted: s.textMuted,
        danger: s.danger,
      },

      badge: {
        verifiedBlue: s.primary,
        verifiedYellow: "#E7C12F",
      },

      button: {
        primary: {
          default: s.primary,
          disabled: "#064E7E",
          hover: "#1681c2",
          outlinedHover: "rgba(29,155,240,0.08)",
        },
      },

      hover: {
        item: s.hover.item,
      },
    },

    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 1000px ${s.appShell} inset`,
              WebkitTextFillColor: s.textPrimary,
            },
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: "none",
            color: theme.palette.text.secondary,

            "&.Mui-selected": {
              color: theme.palette.text.primary,
            },

            "&:hover": {
              backgroundColor: theme.custom.surface,
            },
          }),
        },
      },
    },
  });
};
