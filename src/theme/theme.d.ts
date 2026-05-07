import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      brand: {
        logoPrimary: string;
        logoAccent: string;
      };

      layout: {
        outer: string;
        inner: string;
      };

      surface: string;
      paper: string;
      card: string;

      border: string;

      auth: {
        form: string;
        accent: string;
        text: string;
      };

      text: {
        muted: string;
        link: string;
      };

      avatar: {
        background: string;
        icon: string;
      };

      banner: {
        icon: string;
      };

      icon: {
        primary: string;
        secondary: string;
        muted: string;
        danger: string;
      };

      badge: {
        verifiedBlue: string;
        verifiedYellow: string;
      };

      button: {
        primary: {
          default: string;
          disabled: string;
          hover: string;
          outlinedHover: string;
        };
      };

      hover: {
        item: string;
      };

      overlay: {
        page: string;
        modal: string;
      };
    };
  }

  interface ThemeOptions {
    custom?: Theme["custom"];
  }
}
